import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface Split {
  id: string;
  title: string;
  description?: string;
  total_amount: number;
  created_at: string;
  creator_id: string;
  status: string;
}

export interface SplitItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface PaymentLink {
  id: string;
  split_id: string;
  short_code: string;
  created_by: string;
  created_at: string;
  expires_at: string;
  is_active: boolean;
}

export interface ItemClaim {
  id: string;
  split_id: string;
  item_index: number;
  item_name: string;
  item_amount: number;
  claimed_by_email: string;
  claimed_by_name: string;
  share_count: number;
}

export interface Profile {
  id: string;
  full_name: string;
  avatar_url?: string;
  payid?: string;
  stripe_connect_account_id?: string;
}

export interface SplitWithDetails extends Split {
  items?: SplitItem[];
  creator?: Profile;
  claims?: ItemClaim[];
  payment_link_id?: string;
}

// Fetch split by payment link code
export async function getSplitByCode(code: string): Promise<SplitWithDetails | null> {
  // First get the payment link
  const { data: paymentLink, error: linkError } = await supabase
    .from('payment_links')
    .select('*')
    .eq('short_code', code)
    .eq('is_active', true)
    .single();

  if (linkError || !paymentLink) {
    console.error('Payment link not found:', linkError);
    return null;
  }

  // Check if expired
  if (new Date(paymentLink.expires_at) < new Date()) {
    console.error('Payment link expired');
    return null;
  }

  // Get the split
  const { data: split, error: splitError } = await supabase
    .from('splits')
    .select('*')
    .eq('id', paymentLink.split_id)
    .single();

  if (splitError || !split) {
    console.error('Split not found:', splitError);
    return null;
  }

  // Get creator profile separately (creator_id matches profile id)
  let creator: Profile | undefined;
  if (split.creator_id) {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('id, full_name, avatar_url, payid, stripe_connect_account_id')
      .eq('id', split.creator_id)
      .single();

    if (profileData) {
      creator = profileData;
    }
  }

  // Get items from split_items table
  const { data: itemsData } = await supabase
    .from('split_items')
    .select('id, name, quantity, unit_price, total_price')
    .eq('split_id', split.id);

  // Transform items to expected format
  const items: SplitItem[] = (itemsData || []).map(item => ({
    id: item.id,
    name: item.name,
    price: parseFloat(item.total_price) || parseFloat(item.unit_price) || 0,
    quantity: parseFloat(item.quantity) || 1,
    unit_price: parseFloat(item.unit_price) || 0,
    total_price: parseFloat(item.total_price) || 0,
  }));

  // Get existing claims for this split
  const { data: claims } = await supabase
    .from('item_claims')
    .select('*')
    .eq('split_id', split.id);

  return {
    ...split,
    items,
    creator,
    claims: claims || [],
    payment_link_id: paymentLink.id,
  };
}

// Save item claims
export async function saveItemClaims(
  splitId: string,
  paymentLinkId: string,
  claims: {
    itemIndex: number;
    itemName: string;
    itemAmount: number;
    claimedByEmail: string;
    claimedByName: string;
    shareCount?: number;
  }[]
): Promise<boolean> {
  const insertData = claims.map(claim => ({
    split_id: splitId,
    payment_link_id: paymentLinkId,
    item_index: claim.itemIndex,
    item_name: claim.itemName,
    item_amount: claim.itemAmount,
    claimed_by_email: claim.claimedByEmail,
    claimed_by_name: claim.claimedByName,
    share_count: claim.shareCount || 1,
  }));

  const { error } = await supabase
    .from('item_claims')
    .upsert(insertData, {
      onConflict: 'split_id,item_index,claimed_by_email',
    });

  if (error) {
    console.error('Error saving claims:', error);
    return false;
  }

  return true;
}

// Create payment record
export async function createPaymentRecord(
  splitId: string,
  paymentLinkId: string,
  payerEmail: string,
  payerName: string,
  amount: number,
  recipientUserId: string,
  recipientPayId: string
): Promise<string | null> {
  const clientPaymentId = `zap_${Date.now()}_${Math.random().toString(36).substring(7)}`;

  const { data, error } = await supabase
    .from('web_payments')
    .insert({
      split_id: splitId,
      payment_link_id: paymentLinkId,
      payer_email: payerEmail,
      payer_name: payerName,
      amount: amount,
      azupay_client_payment_id: clientPaymentId,
      status: 'pending',
      recipient_user_id: recipientUserId,
      recipient_payid: recipientPayId,
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error creating payment record:', error);
    return null;
  }

  return data.id;
}

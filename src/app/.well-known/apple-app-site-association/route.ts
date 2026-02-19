import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    applinks: {
      apps: [],
      details: [
        {
          appID: '48TQ9H988B.com.yourname.zapsplit',
          paths: ['/pay/*'],
        },
      ],
    },
  };

  return NextResponse.json(data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

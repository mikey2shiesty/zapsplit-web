import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ZapSplit - Split Bills Instantly",
  description: "The fastest way to split bills. Scan receipts, share a link, and let everyone pay their fair share with instant bank transfers.",
  keywords: ["bill splitting", "split bills", "receipt scanner", "PayTo", "instant payments", "Australia"],
  authors: [{ name: "ZapSplit" }],
  openGraph: {
    title: "ZapSplit - Split Bills Instantly",
    description: "The fastest way to split bills. Scan receipts, share a link, and pay instantly.",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZapSplit - Split Bills Instantly",
    description: "The fastest way to split bills. Scan receipts, share a link, and pay instantly.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ZapSplit",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "5km Marina Bay Jog | Gardens by the Bay → Merlion Park",
  description:
    "Fri Apr 3, 7–8 AM. Join a scenic 5km jog along Singapore's Marina Bay waterfront. Gardens by the Bay MRT → Merlion Park. Supertree Grove, Dragonfly Lake, zero road crossings.",
  openGraph: {
    title: "5km Marina Bay Jog | Fri Apr 3, 7 AM",
    description:
      "Fri Apr 3, 7–8 AM. 5km scenic jog along Marina Bay waterfront, Singapore.",
    type: "website",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

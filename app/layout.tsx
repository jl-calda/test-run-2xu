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
  title: "10km Race | The Esplanade Loop via National Stadium",
  description:
    "Fri Apr 3, 7–8 AM. 10km race loop from The Esplanade through Marina Promenade, Nicoll Highway, National Stadium, Tanjong Rhu and back. Singapore.",
  openGraph: {
    title: "10km Race | Fri Apr 3, 7 AM | Singapore",
    description:
      "Fri Apr 3, 7–8 AM. 10km race loop from The Esplanade via National Stadium, Singapore.",
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

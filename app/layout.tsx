import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "5km Marina Bay Jog | Gardens by the Bay → Merlion Park",
  description:
    "Join a scenic 5km jogging route along Singapore's Marina Bay waterfront. From Gardens by the Bay MRT to Merlion Park — Supertree Grove, Dragonfly Lake, zero road crossings.",
  openGraph: {
    title: "5km Marina Bay Jog | Gardens by the Bay → Merlion Park",
    description:
      "Join a scenic 5km jogging route along Singapore's Marina Bay waterfront.",
    type: "website",
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

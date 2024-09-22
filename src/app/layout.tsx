import "./globals.css";

import { Outfit } from "next/font/google";
import { Metadata } from "next";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Board",
  description: "devChallenges Task Board Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>{children}</body>
    </html>
  );
}

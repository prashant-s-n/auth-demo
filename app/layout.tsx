import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Google OAuth Demo",
  description: "Minimal Next.js Google OAuth demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

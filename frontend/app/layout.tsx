import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Government Spending Dashboard",
  description: "AI-powered Government Spending Intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#030712] text-white">
        {children}
      </body>
    </html>
  );
}
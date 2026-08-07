import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";

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
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-6 bg-gray-100">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
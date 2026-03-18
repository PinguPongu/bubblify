import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./navbar/navbar";

export const metadata: Metadata = {
  title: "Bubblify",
  description: "No troubles. Only bubbles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-950">
        <div className="min-h-screen">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}

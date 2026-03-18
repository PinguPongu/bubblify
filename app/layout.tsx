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
      <body className="min-h-screen bg-white text-slate-950">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.18),_transparent_24%),linear-gradient(180deg,_#f8fbff_0%,_#f4f9ff_38%,_#ffffff_100%)]">

          <Navbar/>
          {children}
        </div>
      </body>
    </html>
  );
}

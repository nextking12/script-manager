import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Script Manager...",
  description: "Meet Script Manager",
  //icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <Navbar />
        <div className="min-h-screen bg-background text-foreground pt-16">{children}</div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/home page/Navbar";
import { Toaster } from "react-hot-toast";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ICTBoost",
  description: "Learn HTML and C Programming with AI-powered guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      data-theme='light'
      lang="en" className={lexend.variable}>
      <body className="min-h-screen font-sans antialiased ">
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
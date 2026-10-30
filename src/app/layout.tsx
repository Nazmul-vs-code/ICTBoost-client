import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/home page/Navbar";
import Footer from "@/components/home page/Footer";
import { Toaster } from "react-hot-toast";

const geologica = Geologica({
  subsets: ["latin"],
  variable: "--font-geologica"
})

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
      lang="en"
      className={geologica.className}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('ictboost-theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              border: "1px solid var(--app-border)",
              borderRadius: 0,
              background: "var(--app-surface)",
              color: "var(--app-foreground)",
            },
          }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

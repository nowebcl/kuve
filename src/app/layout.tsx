import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KUVE | Global Tech, Engineered by Experts",
  description: "High-level software development, advanced AI automation, and corporate enterprise scaling. Premium engineering for high-level operations.",
  metadataBase: new URL("https://kuve.cl"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KUVE | Global Tech, Engineered by Experts",
    description: "High-level software development, advanced AI automation, and corporate enterprise scaling.",
    url: "https://kuve.cl",
    siteName: "KUVE",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KUVE | Global Tech, Engineered by Experts",
    description: "High-level software development, advanced AI automation, and corporate enterprise scaling.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} h-full scroll-smooth`}>
      <body className="bg-[#0A0A0A] text-[#F3F4F6] w-screen h-screen overflow-hidden antialiased">
        {children}
      </body>
    </html>
  );
}

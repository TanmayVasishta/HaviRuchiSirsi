import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ಹವಿ ರುಚಿ ಕಿಚನ್ | Havi Ruchi Kitchen — Traditional Havyaka Food, Shirsi",
  description:
    "Authentic Havyaka home-cooked food delivered to your doorstep in Shirsi. Weekly rotating menu — breakfast, lunch & dinner. Order via WhatsApp.",
  keywords: "havyaka food, shirsi, karnataka, home delivery, catering, traditional food",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kn" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

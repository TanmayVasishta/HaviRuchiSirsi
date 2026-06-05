import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { LangProvider } from "@/lib/language-context";
import "./globals.css";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ಹವಿ ರುಚಿ ಕಿಚನ್ | Havi Ruchi Kitchen",
  description:
    "ಶಿರಸಿಯಲ್ಲಿ ಅಪ್ಪಟ ಹವ್ಯಕ ಮನೆ ಅಡುಗೆ, ನಿಮ್ಮ ಬಾಗಿಲಿಗೆ. Authentic Havyaka home-cooked food delivered in Sirsi.",
  icons: { icon: "/images/logo1.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kn" className={`${geist.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-cream relative" suppressHydrationWarning>
        {/* Global logo watermark — fixed center, mildly visible */}
        <div
          className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center"
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo1.png"
            alt=""
            className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full object-cover opacity-[0.07]"
          />
        </div>
        <LangProvider>
          <div className="relative z-10 flex flex-col min-h-full">{children}</div>
        </LangProvider>
      </body>
    </html>
  );
}

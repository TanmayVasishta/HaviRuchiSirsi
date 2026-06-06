import type { Metadata } from "next";
import { Geist, Noto_Sans_Kannada } from "next/font/google";
import { LangProvider } from "@/lib/language-context";
import { CustomCursor } from "@/components/motion";
import "./globals.css";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const notoKannada = Noto_Sans_Kannada({
  variable: "--font-kannada",
  subsets: ["kannada"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
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
    <html lang="kn" className={`${geist.variable} ${notoKannada.variable} h-full antialiased`} suppressHydrationWarning>
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
            className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full object-cover opacity-[0.12]"
          />
        </div>
        <LangProvider>
          <div className="relative z-10 flex flex-col min-h-full">{children}</div>
        </LangProvider>
        <CustomCursor />
      </body>
    </html>
  );
}

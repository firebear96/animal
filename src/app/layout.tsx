import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "🐾 애니멀 페이스 - 나와 닮은 동물상 테스트 | Animal Face",
  description: "인공지능이 당신의 얼굴 특징을 분석하여 가장 닮은 동물상을 찾아 드립니다. 업로드된 사진은 저장되지 않으니 안심하고 테스트해 보세요!",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "애니멀 페이스",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "🐾 애니멀 페이스 - 나와 닮은 동물상 테스트",
    description: "내 얼굴은 어떤 동물과 닮았을까? 지금 바로 확인해 보세요!",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full w-full antialiased`}
    >
      <body className="h-full w-full overflow-hidden bg-slate-50 text-slate-900 selection:bg-indigo-100 m-0 p-0">
        {children}
      </body>
    </html>
  );
}

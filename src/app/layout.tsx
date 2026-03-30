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
  title: "연금 종합 상담 | 연금박사",
  description: "연금 개시 순서만 바꿔도 연금액이 달라집니다. 국민연금, 퇴직연금, IRP, 연금보험, 주택연금 맞춤 상담. 무료 상담 신청하세요.",
  openGraph: {
    title: "연금 종합 상담 | 연금박사",
    description: "연금 개시 순서만 바꿔도 연금액이 달라집니다. 무료 상담 신청하세요.",
    images: [{ url: "/thumbnail.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "연금 종합 상담 | 연금박사",
    description: "연금 개시 순서만 바꿔도 연금액이 달라집니다.",
    images: ["/thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

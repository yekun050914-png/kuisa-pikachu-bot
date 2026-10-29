import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KUISA 우리 조 피카츄 챗봇",
  description: "상반기 우리 조 활동을 피카츄에게 물어보세요",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffd84d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        {/* 갈무리(픽셀 글씨체): 게임 대사창 느낌 */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/galmuri@2.40.3/dist/galmuri.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}

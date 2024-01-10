import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans_KR } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

const IBM = IBM_Plex_Sans_KR({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "민지 |  블로그",
  description: "민지의 개인 블로그",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={IBM.className}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

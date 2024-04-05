import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans_KR } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext, { AuthContextProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

const IBM = IBM_Plex_Sans_KR({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "민지 |  darak-log",
  description: "민지의 개인 블로그",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${IBM.className} bg-black`}>
        <AuthContextProvider>
          <ToastContainer />
          <NavBar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}

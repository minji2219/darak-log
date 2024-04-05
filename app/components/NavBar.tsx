"use client";
import AuthContext from "@/context/AuthContext";
import Link from "next/link";
import { useContext } from "react";

const NavBar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="text-white">
      <div className="flex justify-between p-5 h-[126px]">
        <Link href="/">HOME</Link>
        <div className="flex gap-10">
          <Link href="/write">글쓰기</Link>
          <Link href="/postlist">글목록</Link>
          {user ? (
            <div className="flex flex-col gap-3 items-center">
              <Link href="/about">마이페이지</Link>
              <div className="bg-[url('/profile.jpg')] bg-no-repeat bg-cover w-[50px] h-[50px] rounded-[50%]"></div>
            </div>
          ) : (
            <Link href="/login">로그인</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;

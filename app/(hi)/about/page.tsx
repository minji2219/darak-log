"use client";

import { useEffect, useState } from "react";
import { GoPerson } from "react-icons/go";
import { IoHeartOutline } from "react-icons/io5";

export default function Page() {
  const [postNum, setPostNum] = useState(0);
  const [likedNum, setLikedNum] = useState(0);

  const aboutFetch = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_KEY + "/api/read/about"
    );
    const data = await response.json();
    setPostNum(data.postNum);
    setLikedNum(data.likedNum);
  };

  useEffect(() => {
    aboutFetch();
  }, []);

  return (
    <div>
      <div className="text-center text-white absolute top-24 left-[50%] translate-x-[-50%]">
        <div>다락로그</div>
        <h1 className="text-3xl font-bold pt-2 pb-10">마이페이지</h1>
      </div>
      <div className="w-[250px] h-[250px] rounded-[50%] bg-[url('/profile.jpg')] bg-no-repeat bg-cover border-4 absolute left-[50%] translate-x-[-50%] translate-y-[-50%]"></div>
      <div className="h-[350px] flex justify-between items-end text-[#444444] px-32 pb-16 bg-[#F3F3F3] rounded-t-[100px] rounded-b-3xl -mx-10">
        <div className="flex flex-col items-center">
          <GoPerson size={100} className="mb-7" />
          <span className="text-2xl">방문자</span>
          <span className="text-6xl font-bold">9</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl">게시물</span>
          <span className="text-6xl font-bold">{postNum}</span>
        </div>
        <div className="flex flex-col items-center">
          <IoHeartOutline size={100} className="mb-7" />
          <span className="text-2xl">좋아요</span>
          <span className="text-6xl font-bold">{likedNum}</span>
        </div>
      </div>
    </div>
  );
}

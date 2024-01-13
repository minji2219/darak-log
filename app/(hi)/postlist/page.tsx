"use client";
import axios from "axios";
import Post from "./Post";
import Link from "next/link";

export default function Page() {
  const test = async () => {
    const result = await axios.get("http://localhost:8080/post");
    console.log(result.data);
  };
  return (
    <div className="pt-10">
      <div className="text-center text-white absolute top-24 left-[50%] translate-x-[-50%]">
        <div>다락로그</div>
        <h1 className="text-3xl font-bold pt-2 pb-10">카테고리</h1>
        <div>게시물 3개</div>
      </div>

      <Link href="/detail/1">
        <Post />
      </Link>

      <Link href="/detail/2">
        <Post />
      </Link>
    </div>
  );
}

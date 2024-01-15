"use client";
import useSWR from "swr";
import Post from "./Post";
import Link from "next/link";
import axios from "axios";

export default function Page() {
  // // const test = async () => {
  // //   const result = await axios.get("http://localhost:8080/post");
  // //   console.log(result.data);
  // // };
  // const { data } = useSWR(process.env.API + "/postlist");

  const test = async () => {
    // const data = await axios.get("/api/read/postlist");
    // console.log(data);
    const response = await fetch("/api/read/postlist");

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  };

  test();

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

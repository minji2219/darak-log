"use client";
import axios from "axios";
import { useEffect } from "react";
import Post from "./Post";
import Link from "next/link";

export default function Page() {
  const test = async () => {
    const result = await axios.get("http://localhost:8080/post");
    console.log(result.data);
  };
  return (
    <div>
      <Link href="/detail/1">
        <Post />
      </Link>

      <Link href="/detail/2">
        <Post />
      </Link>
    </div>
  );
}

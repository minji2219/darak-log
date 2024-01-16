"use client";

import Post from "./Post";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}
export default function Page() {
  const [posts, setPosts] = useState<Post[]>();
  const postlists = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_KEY + "/api/read/postlist"
    )
      .then((res) => res.json())
      .then((data) => setPosts(data.posts));
  };
  useEffect(() => {
    postlists();
  }, []);

  return (
    <div className="pt-10">
      <div className="text-center text-white absolute top-24 left-[50%] translate-x-[-50%]">
        <div>다락로그</div>
        <h1 className="text-3xl font-bold pt-2 pb-10">카테고리</h1>
        <div>게시물 {posts?.length}개</div>
      </div>
      {posts &&
        posts?.map((post) => (
          <div key={post._id}>
            <Link href={`/detail/${post._id}`}>
              <Post
                title={post.title}
                content={post.content}
                createdAt={post.createdAt}
              />
            </Link>
          </div>
        ))}
    </div>
  );
}

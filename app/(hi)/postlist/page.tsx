"use client";

import Post, { PostProps } from "./Post";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface Comment {
  createdAt: string;
  comment: string;
}
export interface Post {
  title: string;
  createdAt: string;
  content: string;
  summary: string;
  category: string;
  comments?: Comment[];
  _id: string;
}
export default function Page() {
  const [posts, setPosts] = useState<Post[]>();
  const postlistFetch = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_KEY + "/api/read/postlist"
    )
      .then((res) => res.json())
      .then((data) => setPosts(data.posts));
  };
  useEffect(() => {
    postlistFetch();
  }, []);

  return (
    <div className="pt-10">
      <div className="text-center text-white absolute top-24 left-[50%] translate-x-[-50%]">
        <div>다락로그</div>
        <h1 className="text-3xl font-bold pt-2 pb-10">카테고리</h1>
        <div>게시물 {posts?.length}개</div>
      </div>

      {posts &&
        posts?.map((post) => {
          let imgStart = post.content.indexOf("src");
          let img;

          if (imgStart > -1) {
            let imgEnd = post.content.indexOf(">", imgStart);
            img = post.content.slice(imgStart + 5, imgEnd - 1);
          }

          return (
            <div key={post._id}>
              <Link href={`/detail/${post._id}`}>
                <Post
                  title={post.title}
                  img={img}
                  createdAt={post.createdAt}
                  summary={post.summary}
                  commentNum={post.comments ? post.comments.length : 0}
                  // category={post.category}
                  // content={post.content}
                />
              </Link>
            </div>
          );
        })}
    </div>
  );
}

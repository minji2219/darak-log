"use client";

import Post, { PostProps } from "./Post";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface Comment {
  createdAt: string;
  comment: string;
  nickname: string;
}
export interface Post {
  title: string;
  createdAt: string;
  content: string;
  summary: string;
  category: string;
  like?: number;
  comments?: Comment[];
  _id: string;
}
export default function Page() {
  const [posts, setPosts] = useState<Post[]>();
  const [category, setCategory] = useState("전체");

  const postlistFetch = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_KEY +
        "/api/read/postlist/?category=" +
        category
    );
    const data = await response.json();
    setPosts(data.posts);
  };
  useEffect(() => {
    postlistFetch();
  }, [category]);

  return (
    <div className="pt-10">
      <div className="text-center text-white absolute top-24 left-[50%] translate-x-[-50%]">
        <div>다락로그</div>
        <select
          name="category"
          className="text-3xl bg-transparent text-center ml-4 my-3 focus:outline-none"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          value={category}
        >
          <option className="text-gray-500" value="전체">
            카테고리
          </option>
          <option className="text-gray-500" value="일상">
            일상
          </option>
          <option className="text-gray-500" value="여행">
            여행
          </option>
          <option className="text-gray-500" value="공부">
            공부
          </option>
        </select>
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
                  likedNum={post?.like ? post?.like : 0}
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

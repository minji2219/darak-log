"use client";
import { Post } from "@/(hi)/postlist/page";
import PostForm from "@/components/PostForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [post, setPost] = useState<Post>();
  const params = useParams();

  const postFetch = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_KEY + "/api/read/detail/" + params?.id
    );
    const data = await response.json();
    setPost(data.post);
  };

  useEffect(() => {
    postFetch();
  }, []);

  return (
    <>
      <div className="text-center text-white absolute top-24 left-[50%] translate-x-[-50%]">
        <div>다락로그</div>
        <h1 className="text-3xl font-bold pt-2 pb-10">글수정</h1>
      </div>
      <PostForm postContent={post} />
    </>
  );
}

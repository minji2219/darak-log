"use client";
import IconGroup from "@/components/IconGroup";
import Comment from "../comment";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Post } from "@/(hi)/postlist/page";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const [post, setPost] = useState<Post>();
  const [commentWrite, setCommentWrite] = useState("");
  const [nickname, setNickname] = useState("");
  const [heartSort, setHeartSort] = useState("outline");
  const params = useParams();
  const router = useRouter();

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (commentWrite === "") {
      alert("댓글을 입력하세요.");
      return;
    }
    await fetch(
      process.env.NEXT_PUBLIC_API_KEY + "/api/write/comment/?id=" + params?.id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          comment: commentWrite,
          nickname: nickname,
        }),
      }
    );
    setCommentWrite("");
    setNickname("");
    postFetch();
  };

  const deletePost = async () => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (confirm) {
      await fetch(
        process.env.NEXT_PUBLIC_API_KEY +
          "/api/delete/deletepost/?id=" +
          params?.id,
        {
          method: "DELETE",
        }
      );
    }
    router.back();
  };

  const likedHandle = async () => {
    await fetch(
      process.env.NEXT_PUBLIC_API_KEY + "/api/write/liked/?id=" + params?.id
    );
    postFetch();
    setHeartSort("fill");
    setTimeout(() => {
      setHeartSort("outline");
    }, 2000);
  };

  return (
    <div className="max-w-[950px] mx-auto">
      <div className="text-center text-white absolute top-24 left-[50%] translate-x-[-50%]">
        <div>{post?.category}</div>
        <h1 className="text-3xl font-bold pt-2 pb-10">{post?.title}</h1>
        <div>{post?.createdAt}</div>
      </div>
      <div className="flex justify-center mb-24">
        <IconGroup
          commentNum={post?.comments ? post?.comments.length : 0}
          likedNum={post?.like ? post?.like : 0}
        />
      </div>
      <div className="min-h-[350px]">
        <div
          dangerouslySetInnerHTML={{
            __html: post?.content as string,
          }}
        />
      </div>
      <div className="text-gray-400 border-b-2 pb-1 flex justify-between">
        <p>댓글</p>
        <div className="flex gap-7">
          <Link href={`/edit/${params?.id}`}>
            <div className="text__btn">수정</div>
          </Link>
          <div onClick={deletePost} className="text__btn">
            삭제
          </div>
          {heartSort === "outline" ? (
            <IoHeartOutline
              size="25"
              className="text__btn text-red-400 "
              onClick={likedHandle}
            />
          ) : (
            <IoHeart size="25" className="text__btn text-red-400 " />
          )}
        </div>
      </div>

      {post?.comments?.map((commmet, index) => (
        <div key={index}>
          <Comment data={commmet} />
        </div>
      ))}

      <form onSubmit={onSubmit} className="border-t-2 mt-20 pt-5 pb-16">
        <div className="flex gap-3 items-center px-5 pb-3">
          <div className="w-[40px] h-[40px] rounded-[50%] bg-[#D9D9D9]"></div>
          <input
            name="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="font-bold border-2 rounded-md p-1 w-40"
            placeholder="닉네임"
          />
        </div>
        <div className="flex gap-2 grow">
          <textarea
            placeholder="내용"
            className="p-3 border-2 border-black rounded-3xl grow"
            value={commentWrite}
            onChange={(e) => setCommentWrite(e.target.value)}
          />
          <button className="p-10 bg-black text-white rounded-3xl">등록</button>
        </div>
      </form>
    </div>
  );
}

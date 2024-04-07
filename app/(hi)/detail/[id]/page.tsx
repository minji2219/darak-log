"use client";
import IconGroup from "@/components/IconGroup";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { Post } from "@/(hi)/postlist/page";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import CommentComponent from "../comment";

export default function Page() {
  const [post, setPost] = useState<Post>();
  const [commentWrite, setCommentWrite] = useState("");
  const [heartSort, setHeartSort] = useState("outline");
  const params = useParams();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const postFetch = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_KEY + "/api/read/detail/" + params?.id
    );
    const data = await response.json();
    setPost(data.post);
  };

  useEffect(() => {
    postFetch();
  }, [heartSort]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      alert("로그인 후 댓글 작성이 가능합니다.");
      return;
    }
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
          nickname: user.email,
        }),
      }
    );
    setCommentWrite("");
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
      <div className="min-h-[350px] mb-10">
        <div
          dangerouslySetInnerHTML={{
            __html: post?.content as string,
          }}
        />
      </div>
      <div className="text-gray-400 border-b-2 pb-1 flex justify-between">
        <p>댓글</p>
        <div className="flex gap-7">
          {post?.user === user?.email && (
            <>
              <Link href={`/edit/${params?.id}`}>
                <div className="text__btn">수정</div>
              </Link>
              <div onClick={deletePost} className="text__btn">
                삭제
              </div>
            </>
          )}

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
          <CommentComponent data={commmet} />
        </div>
      ))}

      <form onSubmit={onSubmit} className="border-t-2 mt-20 pt-10 pb-16">
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

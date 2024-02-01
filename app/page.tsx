"use client";
import { useEffect, useState } from "react";
import HomePost from "./components/HomePost";
import { Post } from "./(hi)/postlist/page";

export default function Home() {
  const [threePosts, setThreePosts] = useState<Post[]>();
  const [postNum, setPostNum] = useState(0);
  const [likedNum, setLikedNum] = useState(0);

  const thirdPostFetch = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_KEY + "/api/read/thirdpost"
    );
    const data = await response.json();
    setThreePosts(data.posts);
    setPostNum(data.postNum);
    setLikedNum(data.likedNum);
  };

  useEffect(() => {
    thirdPostFetch();
  }, []);

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="text-white text-4xl font-extrabold text-center mb-24">
        다락로그
      </div>

      <HomePost post={(threePosts && threePosts[0]) || undefined} />
      <HomePost post={(threePosts && threePosts[1]) || undefined} small />
      <HomePost post={(threePosts && threePosts[2]) || undefined} small />

      <div className="flex justify-between">
        <div className="bg-white h-[300px] w-[550px] rounded-[200px] my-5 py-14 px-20">
          <div className="border-b-2 text-2xl">COUNT</div>
          <div className="flex justify-between py-3 px-5 border-b-2 border-dashed">
            <span>방문자</span>
            <span>9</span>
          </div>
          <div className="flex justify-between py-3 px-5 border-b-2 border-dashed">
            <span>게시물</span>
            <span>{postNum}</span>
          </div>
          <div className="flex justify-between py-3 px-5">
            <span>좋아요</span>
            <span>{likedNum}</span>
          </div>
        </div>
        <div className="bg-[url('/profile.jpg')] bg-no-repeat bg-cover h-[300px] w-[300px] rounded-[50%] my-5"></div>
      </div>
    </div>
  );
}

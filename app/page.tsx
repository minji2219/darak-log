"use client";
import { useEffect, useState } from "react";
import HomePost from "./components/HomePost";
import { Post } from "./(hi)/postlist/page";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase/firebase";

export default function Home() {
  const [threePosts, setThreePosts] = useState<Post[]>();
  const [postNum, setPostNum] = useState(0);
  const [likedNum, setLikedNum] = useState(0);
  const auth = getAuth(app);
  const [init, setInit] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

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

  //auth에 obserber를 넣어서 계정이 변동이 되었는지 새로고침 안해도 확인 가능하게 하는 것
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);
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

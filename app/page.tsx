import Image from "next/image";
import HomePost from "./components/HomePost";

export default function Home() {
  return (
    <div className="max-w-[900px] mx-auto">
      <div className="text-white text-4xl font-extrabold text-center mb-24">
        다락로그
      </div>
      <HomePost />
      <HomePost small />
      <HomePost small />

      <div className="flex justify-between">
        <div className="bg-white h-[300px] w-[550px] rounded-[200px] my-5 py-14 px-20">
          <div className="border-b-2 text-2xl">COUNT</div>
          <div className="flex justify-between py-3 px-5 border-b-2 border-dashed">
            <span>방문자</span>
            <span>9</span>
          </div>
          <div className="flex justify-between py-3 px-5 border-b-2 border-dashed">
            <span>게시물</span>
            <span>17</span>
          </div>
          <div className="flex justify-between py-3 px-5">
            <span>좋아요</span>
            <span>50</span>
          </div>
        </div>
        <div className="bg-[url('/profile.jpg')] bg-no-repeat bg-cover h-[300px] w-[300px] rounded-[50%] my-5"></div>
      </div>
    </div>
  );
}

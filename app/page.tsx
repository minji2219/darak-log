import Image from "next/image";
import NavBar from "./components/NavBar";
import HomeBox from "./components/HomeBox";

export default function Home() {
  return (
    <div>
      <div className="bg-slate-600 w-[100%] h-[400px]">캐러셸</div>
      <div className="max-w-[680px] mx-auto">
        <div className="relative -top-10 bg-slate-200 py-5 px-10 flex justify-between text-center">
          <div>
            <div>이름</div>
            <div>서민지</div>
          </div>
          <hr className="border border-gray-500 h-10" />
          <div>
            <div>생년월일</div>
            <div>01.02.19</div>
          </div>
          <hr className="border border-gray-500 h-10" />
          <div>
            <div>정보</div>
            <div>내용</div>
          </div>
          <hr className="border border-gray-500 h-10" />
          <div>
            <div>정보</div>
            <div>내용</div>
          </div>
        </div>
        <div>
          <h1>Count</h1>
          <HomeBox />
        </div>
      </div>
    </div>
  );
}

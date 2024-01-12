import Link from "next/link";

const NavBar = () => {
  return (
    <div className="relative text-white">
      <div className="flex justify-between p-5">
        <Link href="/">HOME</Link>
        <div className="flex gap-10">
          <Link href="/write">글쓰기</Link>
          <Link href="/postlist">글목록</Link>
          <Link href="/about">마이페이지</Link>
        </div>
      </div>
      {/* <div className="bg-white h-20 rounded-t-[50%] w-[100%] absolute bottom-0 -z-8"></div> */}
    </div>
  );
};

export default NavBar;

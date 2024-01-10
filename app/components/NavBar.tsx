import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex justify-between bg-slate-100 p-5">
      <Link href="/">HOME</Link>
      <div className="flex gap-10">
        <Link href="/postlist">글목록</Link>
        <Link href="/write">글쓰기</Link>
        <Link href="/about">About</Link>
      </div>
    </div>
  );
};

export default NavBar;

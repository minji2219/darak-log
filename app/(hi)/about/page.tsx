import Image from "next/image";

export default function Page() {
  return (
    <div className="h-[80vh]">
      <div className="text-center text-white absolute top-24 left-[50%] translate-x-[-50%]">
        <div>다락로그</div>
        <h1 className="text-3xl font-bold pt-2 pb-10">마이페이지</h1>
      </div>
      <div className="w-[250px] h-[250px] rounded-[50%] bg-[url('/profile.jpg')] bg-no-repeat bg-cover border-4 absolute left-[50%] translate-x-[-50%] translate-y-[-50%]"></div>
      {/* <Image src="/subtract.png" alt="" width={800} height={300} /> */}
    </div>
  );
}

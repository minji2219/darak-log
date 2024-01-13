import PostForm from "@/components/PostForm";
export default function Page() {
  return (
    <>
      <div className="text-center text-white absolute top-24 left-[50%] translate-x-[-50%]">
        <div>다락로그</div>
        <h1 className="text-3xl font-bold pt-2 pb-10">글쓰기</h1>
      </div>
      <PostForm />
    </>
  );
}

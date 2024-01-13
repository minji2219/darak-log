import IconGroup from "@/components/IconGroup";

const Post = () => {
  return (
    <div className="flex gap-5 border-b py-6">
      <div className="w-[250px] h-[250px] bg-slate-300 rounded-3xl"></div>
      <div className="p-5">
        <div>
          <div className="text-gray-400 pb-2">2024.01.11</div>
          <h1 className="text-3xl font-bold pb-20">글 제목</h1>
          <div>내용 미리보기</div>
        </div>
        <IconGroup />
      </div>
    </div>
  );
};

export default Post;

import { BsChat } from "react-icons/bs";
import { IoHeartOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";

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
        <div className="flex gap-5 items-center mt-5">
          <div className="flex gap-2 items-center">
            <BsChat size="15" />
            <span>3</span>
          </div>
          <div className="flex gap-2 items-center">
            <IoHeartOutline size="20" />
            <span>5</span>
          </div>
          <div className="flex gap-2 items-center">
            <FaRegEye size="15" />
            <span>10</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

import { Comment } from "../postlist/page";

const Comment = ({ data }: Comment) => {
  return (
    <div className="bg-[#F3F3F3] h-[120px] rounded-3xl my-3 px-8 py-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-[40px] h-[40px] rounded-[50%] bg-[#D9D9D9]"></div>
        <div className="font-bold">닉네임</div>
        <div className="text-[#A6A6A6]">{data?.createdAt}</div>
      </div>
      <div>{data?.comment}</div>
    </div>
  );
};

export default Comment;

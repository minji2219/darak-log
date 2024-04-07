import { useContext } from "react";
import { Comment } from "../postlist/page";
import AuthContext from "@/context/AuthContext";

interface CommentPorps {
  data: Comment;
}
const CommentComponent = ({ data }: CommentPorps) => {
  const { user } = useContext(AuthContext);
  const deleteComment = () => {};
  return (
    <div className="bg-[#F3F3F3] h-[120px] rounded-3xl my-3 px-8 py-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-[40px] h-[40px] rounded-[50%] bg-[#D9D9D9]"></div>
          <div className="font-bold">{data?.nickname}</div>
          <div className="text-[#A6A6A6]">{data?.createdAt}</div>
        </div>
        {data?.nickname === user?.email && (
          <div onClick={deleteComment} className="text__btn text-red-500">
            삭제
          </div>
        )}
      </div>

      <div>{data?.comment}</div>
    </div>
  );
};

export default CommentComponent;

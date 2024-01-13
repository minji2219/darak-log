import IconGroup from "@/components/IconGroup";
import Comment from "../comment";
import { IoHeartOutline } from "react-icons/io5";
const page = () => {
  return (
    <div className="max-w-[950px] mx-auto">
      <div className="text-center text-white absolute top-24 left-[50%] translate-x-[-50%]">
        <div>카테고리</div>
        <h1 className="text-3xl font-bold pt-2 pb-10">글 제목</h1>
        <div>2024.01.11 THU</div>
      </div>
      <div className="flex justify-center mb-24">
        <IconGroup />
      </div>
      <div className="min-h-[350px]">
        오늘은 친구들이랑 카공을 했따
        <br /> 문수연은 앞에서 울면서 폰만 하고 ㅣㅇㅆ다
        <br />
        수연아 힘내
        <br /> 괜찮아 그럴 수 있지
      </div>
      <div className="text-gray-400 border-b-2 pb-1 flex justify-between">
        <p>댓글</p>
        <div className="flex gap-7">
          <div>수정</div>
          <div>삭제</div>
          <IoHeartOutline size="25" />
        </div>
      </div>
      <Comment />
      <Comment />
    </div>
  );
};

export default page;

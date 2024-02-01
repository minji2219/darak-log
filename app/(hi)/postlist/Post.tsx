import IconGroup from "@/components/IconGroup";
import Image from "next/image";
// import DOMPurify from "dompurify";

export interface PostProps {
  title: string;
  createdAt: string;
  summary: string;
  img?: string;
  commentNum: number;
  likedNum: number;
}
const Post = (props: PostProps) => {
  return (
    <div className="flex gap-8 border-b py-6">
      {props.img ? (
        <Image
          src={props.img}
          alt="썸네일"
          width={250}
          height={250}
          className="h-[250px] rounded-3xl"
        />
      ) : (
        <div className="min-w-[250px] h-[250px] bg-slate-300 rounded-3xl">
          기본 그림
        </div>
      )}

      <div className="py-5">
        <div>
          <div className="text-gray-400 pb-2">{props.createdAt}</div>
          <h1 className="text-3xl font-bold pb-20">{props.title}</h1>
          <div>{props.summary}</div>
        </div>
        <IconGroup commentNum={props.commentNum} likedNum={props.likedNum} />
      </div>
    </div>
  );
};

export default Post;

import IconGroup from "@/components/IconGroup";
// import DOMPurify from "dompurify";

export interface PostProps {
  title: string;
  content: string;
  createdAt: string;
  category: string;
}
const Post = (props: PostProps) => {
  return (
    <div className="flex gap-5 border-b py-6">
      <div className="w-[250px] h-[250px] bg-slate-300 rounded-3xl"></div>
      <div className="p-5">
        <div>
          <div className="text-gray-400 pb-2">{props.createdAt}</div>
          <h1 className="text-3xl font-bold pb-20">{props.title}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: props.content,
            }}
            style={{
              marginTop: "30px",
              overflow: "hidden",
              whiteSpace: "pre-wrap",
            }}
          />
        </div>
        <IconGroup />
      </div>
    </div>
  );
};

export default Post;

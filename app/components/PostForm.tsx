"use client";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
  name: string;
}
const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: QuillComponent } = await import("react-quill");
    const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <QuillComponent ref={forwardedRef} {...props} />
    );
    return Quill;
  },
  { loading: () => <div>...loading</div>, ssr: false }
);

export default function Page() {
  const quillInstance = useRef<ReactQuill>(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const submit = async () => {
    await fetch(process.env.NEXT_PUBLIC_API_KEY + "/api/write/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        //TODO, 셋중 하나라도 빠지면 toast로 빈칸 입력 err 뜨게하기
        title: title,
        content: content,
        category: category,
      }),
    });
  };
  return (
    <form onSubmit={submit} className="mt-5 relative">
      <select
        name="category"
        className="block mx-auto mb-5 px-10 text-xl border-b-2 text-[#A6A6A6] focus:outline-none"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="카테고리1">카테고리1</option>
        <option value="카테고리2">카테고리2</option>
        <option value="카테고리3">카테고리3</option>
      </select>
      <input
        name="title"
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-[90%] mb-10 mx-auto bg-[#F3F3F3] p-4 rounded-3xl text-center block"
      />
      <QuillNoSSRWrapper
        name="content"
        forwardedRef={quillInstance}
        value={content}
        onChange={setContent}
        // modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
        className="h-[430px] mb-10"
      />
      <button className="bg-[#93AE8A] text-white text-lg p-4 rounded-r-3xl absolute top-[50px] right-[-150px]">
        등록
      </button>
    </form>
  );
}

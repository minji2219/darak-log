"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import "../globals.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Page() {
  const [value, setValue] = useState("");
  const QuillWrapper = dynamic(() => import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  });
  return (
    <form className="mt-5 relative">
      <input
        type="text"
        placeholder="제목"
        className="w-[90%] mb-10 mx-auto bg-[#F3F3F3] p-4 rounded-3xl text-center block "
      />
      <QuillWrapper
        theme="snow"
        value={value}
        onChange={setValue}
        className="h-[430px] mb-10"
      />
      <button className="bg-[#93AE8A] text-white text-lg p-4 rounded-r-3xl absolute top-[50px] right-[-150px]">
        등록
      </button>
    </form>
  );
}

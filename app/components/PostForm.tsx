"use client";

import { useState } from "react";
import Input from "@/components/Input";
import "../globals.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Page() {
  const [value, setValue] = useState("");

  return (
    <form className="max-w-[680px] mx-auto">
      <Input label="제목" type="text" placeholder="제목을 입력하세요." />
      {/* 카테고리 select */}
      <label>내용</label>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        className="h-[400px] mb-10"
      />
      <button className="btn--primary">글쓰기</button>
    </form>
  );
}

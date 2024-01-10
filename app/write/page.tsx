import Input from "../components/Input";
import "../globals.css";

export default function Page() {
  return (
    <div className="h-[100vh] max-w-[680px] mx-auto">
      <form>
        <Input label="제목" type="text" placeholder="제목을 입력하세요." />
        {/* 카테고리 select */}
        <div className="my-3"></div>
        <label>내용</label>
        <textarea
          placeholder="내용을 입력하세요."
          className="border border-slate-400 rounded p-2 w-[100%] h-60 mt-2"
        />
        <button className="btn--primary">글쓰기</button>
      </form>
    </div>
  );
}

"use client";
import { Post } from "@/(hi)/postlist/page";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { storage } from "../../firebase/firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
  name: string;
}
interface postContent {
  postContent?: Post;
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

export default function Page({ postContent }: postContent) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("일상");
  const [summary, setSummary] = useState("");

  const quillRef = useRef<ReactQuill>(null);
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname?.slice(1, 5);
  const postId = pathname?.slice(6);

  useEffect(() => {
    if (postContent) {
      setTitle(postContent.title);
      setSummary(postContent.summary);
      setContent(postContent.content);
      setCategory(postContent.category);
    }
  }, [postContent]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title === "") {
      toast.error("제목을 입력해주세요.");
      return;
    } else if (content === "") {
      toast.error("내용을 입력해주세요.");
      return;
    } else if (summary === "") {
      toast.error("요약을 입력해주세요.");
      return;
    }

    if (path === "edit") {
      try {
        await fetch(
          process.env.NEXT_PUBLIC_API_KEY + "/api/edit/editpost/?id=" + postId,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
              title: title,
              content: content,
              category: category,
              summary: summary,
            }),
          }
        );
        toast.success("수정이 완료되었습니다.");
        router.push("/postlist");
      } catch (e) {
        toast.error("수정을 실패하셨습니다.");
      }
    } else {
      try {
        await fetch(process.env.NEXT_PUBLIC_API_KEY + "/api/write/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            title: title,
            content: content,
            category: category,
            summary: summary,
          }),
        });
        toast.success("글작성이 완료되었습니다");
        router.push("/postlist");
      } catch (e) {
        toast.error("글작성에 실패하셨습니다.");
      }
    }
  };

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const editor = quillRef.current?.getEditor();
      const file = input.files![0];
      const range = editor?.getSelection(true)!;

      try {
        const storageRef = ref(storage, `image/${Date.now()}`);
        await uploadBytes(storageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            // 이미지 URL 에디터에 삽입
            editor?.insertEmbed(range.index, "image", url);
            // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
            // editor?.setSelection(range.index + 1);
          });
        });
      } catch (error) {
        console.log(error);
      }
    });
  };
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, "link", "image"],
        ],
        handlers: { image: imageHandler },
      },
    };
  }, []);

  return (
    <form onSubmit={submit} className="mt-5 relative">
      <select
        name="category"
        className="block mx-auto mb-5 px-10 text-xl border-b-2 text-[#A6A6A6] focus:outline-none"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      >
        <option value="일상">일상 👣</option>
        <option value="여행">여행 🛫</option>
        <option value="공부">공부 ✏️</option>
      </select>
      <div className="flex gap-3 mb-8">
        <input
          name="title"
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-[90%] bg-[#F3F3F3] p-4 rounded-3xl text-center"
        />
        <button className="bg-[#93AE8A] w-[100px] text-white text-lg px-5 py-4 rounded-[100px]">
          {path === "edit" ? "수정" : "등록"}
        </button>
      </div>
      <QuillNoSSRWrapper
        forwardedRef={quillRef}
        name="content"
        value={content}
        onChange={setContent}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
        className="h-[430px] mb-16"
      />
      <div className="my-5 text-2xl font-semibold pl-5">요약</div>
      <textarea
        placeholder="내용"
        className="w-[100%] h-32 rounded-2xl p-5 bg-[#F3F3F3] text-lg"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
    </form>
  );
}

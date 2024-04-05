"use client";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { app } from "../../../firebase/firebase";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
      const validRegex = /^[a-z0-9~!@#$%<>?^&*+.]{4,45}$/;
      if (!value?.match(validRegex)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    }
    if (name === "password") {
      setPassword(value);
      if (value.length < 8) {
        setError("비밀번호는 8자리 이상으로 설정해주세요.");
      } else {
        setError("");
      }
    }
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
      toast.success("로그인이 완료 되었습니다.");
    } catch (e: any) {
      console.log(e);
      toast.error(e?.code);
    }
  };
  return (
    <div>
      <div className="text-center text-white absolute top-24 left-[50%] translate-x-[-50%]">
        <div>다락로그</div>
        <h1 className="text-3xl font-bold pt-2 pb-10">로그인</h1>
      </div>

      <form className="flex flex-col items-center gap-3 mt-14">
        <div className="form__block">
          <label htmlFor="id">아이디</label>
          <input type="text" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form__block">
          <label htmlFor="id">비밀번호</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>

        {error && error.length > 0 && (
          <div className="text-red-500">{error}</div>
        )}
        <button
          className="w-80 p-3 my-3 rounded-md bg-[#60a5fa] text-white"
          type="submit"
          onClick={onSubmit}
        >
          로그인
        </button>
        <div>
          회원이 아니신가요?
          <Link href="/signup" className="ml-5 underline">
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
}

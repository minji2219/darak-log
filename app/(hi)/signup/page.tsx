"use client";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { app } from "../../../firebase/firebase";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Signup() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "id") {
      setId(value);
      const validRegex = /^[a-z0-9~!@#$%<>?^&*+.]{4,45}$/;
      if (!value?.match(validRegex)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    }
    if (name === "password") {
      setPassword(value);
      if (value !== passwordConfirm) {
        setError("비밀번호가 일치하지 않습니다.");
      } else if (value.length < 8) {
        setError("비밀번호는 8자리 이상으로 설정해주세요.");
      } else {
        setError("");
      }
    }
    if (name === "passwordConfirm") {
      setPasswordConfirm(value);
      if (value !== password) {
        setError("비밀번호가 일치하지 않습니다.");
      } else {
        setError("");
      }
    }
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, id, password);
      router.push("/");
      toast.success("회원가입이 완료 되었습니다.");
    } catch (e: any) {
      toast.error(e?.code);
    }
  };
  return (
    <div>
      <div className="text-center text-white absolute top-24 left-[50%] translate-x-[-50%]">
        <div>다락로그</div>
        <h1 className="text-3xl font-bold pt-2 pb-10">회원가입</h1>
      </div>

      <form className="flex flex-col items-center gap-3 mt-14">
        <div className="form__block">
          <label htmlFor="id">아이디</label>
          <input type="text" name="id" value={id} onChange={onChange} />
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
        <div className="form__block">
          <label htmlFor="id">비밀번호 확인</label>
          <input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onChange}
          />
        </div>
        {error && error.length > 0 && (
          <div className="text-red-500">{error}</div>
        )}
        <button
          className="w-80 p-3 rounded-md bg-[#60a5fa] text-white"
          type="submit"
          onClick={onSubmit}
        >
          회원가입
        </button>
        <div>
          회원이신가요?
          <Link href="/login" className="ml-5 underline">
            로그인
          </Link>
        </div>
      </form>
    </div>
  );
}

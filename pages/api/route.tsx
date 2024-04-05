import AuthContext from "@/context/AuthContext";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { Component, useContext, useEffect } from "react";

const withAuth = (Component: NextPage | React.FC) => {
  const Auth = () => {
    // redux store | context 등의 상태를 통해 조건부 처리를 한다
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        // Login 컴포넌트를 출력하거나
        // 이미 로그인 화면이 구현된 페이지를 사용하고 싶다면 useRouter()를 통해 라우팅
        alert("해당 페이지는 로그인 후 접근 가능합니다.");
        router.push("/login");
      }
    }, [user]);
    if (user) {
      // 로그인이 되어있다면
      return <Component />;
    }
  };

  return Auth;
};

export default withAuth;

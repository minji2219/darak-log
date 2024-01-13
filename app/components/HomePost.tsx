"use client";

import { useState } from "react";
import IconGroup from "./IconGroup";
import Image from "next/image";

interface HomePostProps {
  small?: boolean;
}

const HomePost = (props: HomePostProps) => {
  const [hover, setHover] = useState(false);
  let size = "big";
  if (props.small) size = "small";

  return (
    <div
      className={`${size}__home-post bg-[url('/하늘.jpg')]`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && (
        <div className="hover">
          <div className="text-white">
            <div className="title">포스트 제목</div>
            <div className="text-lg">2024.01.11</div>
            {size === "big" && <IconGroup />}
          </div>
          <Image src="/vector.png" alt="화살표" width={100} height={100} />
        </div>
      )}
    </div>
  );
};

export default HomePost;

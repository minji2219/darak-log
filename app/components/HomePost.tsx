"use client";

import { useState } from "react";
import IconGroup from "./IconGroup";
import Image from "next/image";
import { Post } from "@/(hi)/postlist/page";
import Link from "next/link";

interface HomePostProps {
  post: Post | undefined;
  small?: boolean;
}

const HomePost = (props: HomePostProps) => {
  const [hover, setHover] = useState(false);
  let size = "big";
  if (props.small) size = "small";

  return (
    <Link href={`/detail/${props.post?._id}`}>
      <div
        className={`${size}__home-post bg-[url('/하늘.jpg')]`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover && props.post !== undefined && (
          <div className="hover">
            <div className="text-white">
              <div className="title">{props.post.title}</div>
              <div className="text-lg">{props.post.createdAt}</div>
              {size === "big" && (
                <IconGroup
                  commentNum={
                    props.post.comments ? props.post.comments.length : 0
                  }
                  likedNum={props.post?.like ? props.post?.like : 0}
                />
              )}
            </div>
            <Image src="/vector.png" alt="화살표" width={100} height={100} />
          </div>
        )}
      </div>
    </Link>
  );
};

export default HomePost;

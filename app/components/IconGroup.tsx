import { BsChat } from "react-icons/bs";
import { IoHeartOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";
const IconGroup = () => {
  return (
    <div className="flex gap-5 items-center mt-5">
      <div className="flex gap-2 items-center">
        <BsChat size="15" />
        <span>3</span>
      </div>
      <div className="flex gap-2 items-center">
        <IoHeartOutline size="20" />
        <span>5</span>
      </div>
      <div className="flex gap-2 items-center">
        <FaRegEye size="15" />
        <span>10</span>
      </div>
    </div>
  );
};

export default IconGroup;
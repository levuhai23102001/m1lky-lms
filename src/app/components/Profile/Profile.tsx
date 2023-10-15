import React, { FC, useState } from "react";
import SidebarProfile from "./SidebarProfile";

type Props = {};

const Profile: FC<Props> = (props) => {
  const [scroll, setScroll] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] bg-slate-900 bg-opacity-90 border border-[#ffffff1d] rounded-[5px] shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SidebarProfile />
      </div>
    </div>
  );
};

export default Profile;

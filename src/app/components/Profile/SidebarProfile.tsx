import Image from "next/image";
import React, { FC } from "react";
import avatarDefault from "../../../../public/assets/avatar.jpg";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { useTheme } from "next-themes";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logoutHandler: any;
};

const SidebarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logoutHandler,
}) => {
  const { theme } = useTheme();

  return (
    <div className="w-full my-4">
      <div
        className={`w-full flex items-center justify-center flex-col px-3 py-4 cursor-pointer ${
          active === 1 ? "dark:bg-transparent bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={
            user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
          }
          alt="avatar"
          width={100}
          height={100}
          className="w-[28px] 800px:w-[100px] 800px:h-[100px] cursor-pointer rounded-full overflow-hidden border-2 dark:border-[#ff3377] border-[#00ffca] object-cover"
        />

        <h5 className="mt-4 800px:block hidden font-Poppins text-[20px] dark:text-white text-black">
          {user.name}
        </h5>
      </div>
      <div
        className={`w-full flex items-center p-4 cursor-pointer ${
          active === 2 ? "dark:bg-slate-800 bg-[#ebebebd4]" : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine
          size={20}
          fill={theme === "light" ? "#000" : "#fff"}
        />
        <h5 className="pl-4 800px:block hidden font-Poppins dark:text-white text-black">
          Change Password
        </h5>
      </div>
      <div
        className={`w-full flex items-center p-4 cursor-pointer ${
          active === 3 ? "dark:bg-slate-800 bg-[#ebebebd4]" : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} fill={theme === "light" ? "#000" : "#fff"} />
        <h5 className="pl-4 800px:block hidden font-Poppins dark:text-white text-black">
          Enrolled Courses
        </h5>
      </div>
      <div
        className={`w-full flex items-center p-4 cursor-pointer ${
          active === 4 ? "dark:bg-slate-800 bg-[#ebebebd4]" : "bg-transparent"
        }`}
        onClick={() => logoutHandler()}
      >
        <AiOutlineLogout size={20} fill={theme === "light" ? "#000" : "#fff"} />
        <h5 className="pl-4 800px:block hidden font-Poppins dark:text-white text-black">
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default SidebarProfile;

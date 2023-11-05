"use client";
import React, { FC, useState } from "react";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import { IoMdNotificationsOutline } from "react-icons/io";

import "./dashboardHeader.css";

type Props = {};

const DashboardHeader: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-0 right-0">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-1 -right-1 bg-[#ff3377] rounded-full w-[15px] h-[15px] text-[12px] flex items-center justify-center text-white">
          3
        </span>
      </div>
      {open && (
        <div className="w-[350px] h-[50vh] dark:bg-[#111c43] bg-white shadow-xl absolute top-16 z-10 rounded p-2 popover">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
            Notifications
          </h5>
          <div className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[ffffff47] border-b-[#0000000f] rounded-md mb-2">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black dark:text-white">
                New question received
              </p>
              <p className="text-black dark:text-white cursor-pointer">
                Mask as read
              </p>
            </div>
            <p className="px-2 text-black dark:text-white">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt
              ratione beatae provident, architecto magni fugit officia
              doloremque et, perspiciatis consectetur iste tenetur delectus
              placeat autem amet explicabo aperiam, molestiae laboriosam!
            </p>
            <p className="p-2 text-black dark:text-white text-[14px] text-right">
              5 days ago
            </p>
          </div>
          <div className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[ffffff47] border-b-[#0000000f] rounded-md mb-2">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black dark:text-white">
                New question received
              </p>
              <p className="text-black dark:text-white cursor-pointer">
                Mask as read
              </p>
            </div>
            <p className="px-2 text-black dark:text-white text-ellipsis overflow-hidden">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt
              ratione beatae provident, architecto magni fugit officia
              doloremque et, perspiciatis consectetur iste tenetur delectus
              placeat autem amet explicabo aperiam, molestiae laboriosam!
            </p>
            <p className="p-2 text-black dark:text-white text-[14px] text-right">
              5 days ago
            </p>
          </div>
          <div className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[ffffff47] border-b-[#0000000f] rounded-md mb-2">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black dark:text-white">
                New question received
              </p>
              <p className="text-black dark:text-white cursor-pointer">
                Mask as read
              </p>
            </div>
            <p className="px-2 text-black dark:text-white text-ellipsis overflow-hidden">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt
              ratione beatae provident, architecto magni fugit officia
              doloremque et, perspiciatis consectetur iste tenetur delectus
              placeat autem amet explicabo aperiam, molestiae laboriosam!
            </p>
            <p className="p-2 text-black dark:text-white text-[14px] text-right">
              5 days ago
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;

"use client";
import React, { FC, useEffect, useState } from "react";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/app/redux/features/notifications/notiticationsApi";
import { format } from "timeago.js";

import "./dashboardHeader.css";

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any>([]);
  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/djybggin4/video/upload/v1702256841/sound/nemknyavbm3s7set7l9p.mp3"
    )
  );

  const playerNotificationSound = () => {
    audio.play();
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }
    if (isSuccess) {
      refetch();
    }
    audio.load();
  }, [data, isSuccess]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      refetch();
      playerNotificationSound();
    });
  }, []);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-0 right-0">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-1 -right-1 bg-[#ff3377] rounded-full w-[15px] h-[15px] text-[12px] flex items-center justify-center text-white">
          {notifications && notifications.length}
        </span>
      </div>
      {open && (
        <div className="w-[350px] h-[50vh] dark:bg-[#111c43] bg-white shadow-xl absolute top-16 rounded p-2 popover z-[999]">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
            Notifications
          </h5>
          {notifications && notifications.length > 0 ? (
            notifications.map((item: any, index: number) => (
              <div
                className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[ffffff47] border-b-[#0000000f] rounded-md mb-2"
                key={index}
              >
                <div className="w-full flex items-center justify-between p-2">
                  <p className="text-black dark:text-white">{item.title}</p>
                  <p
                    className="text-black dark:text-white cursor-pointer text-[12px]"
                    onClick={() => handleNotificationStatusChange(item._id)}
                  >
                    Mask as read
                  </p>
                </div>
                <p className="px-2 text-black dark:text-white">
                  {item.message}
                </p>
                <p className="p-2 text-black dark:text-white text-[14px] text-right">
                  {format(item.createdAt)}
                </p>
              </div>
            ))
          ) : (
            <>
              <div className="flex items-center justify-center">
                <h4 className="text-black dark:text-white">
                  No Notifications!
                </h4>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;

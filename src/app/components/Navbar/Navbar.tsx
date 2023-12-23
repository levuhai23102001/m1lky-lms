"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "./NavItems";
import { ThemeSwitcher } from "../../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { BiSolidUser } from "react-icons/bi";
import MModal from "../Modal/MModal";
import Login from "../../components/Auth/Login";
import SignUp from "../../components/Auth/SignUp";
import Verification from "../../components/Auth/Verification";
import { useSession } from "next-auth/react";
import Image from "next/image";
import avatar from "../../../../public/assets/avatar.jpg";
import {
  useLogoutQuery,
  useSocialAuthMutation,
} from "@/app/redux/features/auth/authApi";
import { toast } from "react-toastify";
import { useLoadUserQuery } from "@/app/redux/features/api/apiSlice";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Navbar: FC<Props> = ({ activeItem, open, setOpen, route, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});
  const { data } = useSession();
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (!userData) {
        if (data) {
          socialAuth({
            email: data?.user?.email,
            name: data?.user?.name,
            avatar: data?.user?.image,
          });
          refetch();
        }
      }
      if (data === null) {
        if (isSuccess) {
          toast.success("Login successfully!");
        }
      }
      if (data === null && !isLoading && !userData) {
        setLogout(true);
      }
    }
  }, [data, userData, isLoading]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.screenY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleCloseSidebar = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full fixed top-0 left-0 z-[9999] backdrop-blur bg-transparent supports-backdrop-blur:bg-white/60 dark:bg-transparent transition duration-300">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black w-full h-[80px] dark:border-[#ffffff1c] shadow-xl transition duration-300"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className={`text-[25px] font-Poppins font-[600] text-black dark:text-white whitespace-nowrap flex items-center`}
              >
                <Image
                  src={require("../../favicon.ico")}
                  alt=""
                  width={50}
                  height={50}
                  className="w-[50px] h-[50px] object-cover"
                />
                <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-[#5FBDFF] to-[#ff3377] hidden 700px:block">
                  M 1 L K Y
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* only for mobile devices */}
              <div className="hidden 800px:flex items-center justify-center mx-4">
                {userData ? (
                  <Link
                    href={"/profile"}
                    className={`${
                      activeItem === 6
                        ? "w-[30px] h-[30px] rounded-full border-solid border-2 border-[#96EFFF] dark:border-[#ff3377] overflow-hidden"
                        : "w-[30px] h-[30px] rounded-full border-solid border-2 border-[#000] dark:border-[#fff] overflow-hidden"
                    }`}
                  >
                    <Image
                      src={
                        userData?.user.avatar
                          ? userData.user.avatar.url
                          : avatar
                      }
                      alt="avatar"
                      width={30}
                      height={30}
                      className="cursor-pointer object-cover"
                    />
                  </Link>
                ) : (
                  <BiSolidUser
                    size={23}
                    className="cursor-pointer dark:text-white text-black"
                    onClick={() => setOpen(true)}
                  />
                )}
              </div>
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={23}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
            </div>
          </div>
        </div>
        {/* mobile sidebar */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[9999] dark:bg-[0000005a] bg-[#0000005a]"
            onClick={handleCloseSidebar}
            id="screen"
          >
            <div className="w-[65%] fixed z-[99999] h-screen bg-white dark:bg-slate-900 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              <div className="w-full flex justify-center">
                {userData ? (
                  <Link
                    href={"/profile"}
                    className={`${
                      activeItem === 5
                        ? "w-[30px] h-[30px] rounded-full border-solid border-2 border-[#96EFFF] dark:border-[#ff3377] overflow-hidden"
                        : "w-[30px] h-[30px] rounded-full border-solid border-2 border-[#000] dark:border-[#fff] overflow-hidden"
                    }`}
                  >
                    <Image
                      src={
                        userData?.user.avatar
                          ? userData.user.avatar.url
                          : avatar
                      }
                      alt="avatar"
                      width={30}
                      height={30}
                      className="cursor-pointer object-cover"
                    />
                  </Link>
                ) : (
                  <BiSolidUser
                    size={23}
                    className="cursor-pointer dark:text-white text-black"
                    onClick={() => setOpen(true)}
                  />
                )}
              </div>

              <p className="w-full text-[12px] absolute bottom-5 flex justify-center text-center text-black dark:text-white">
                Copyright © 2023 M1LKY
              </p>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && (
        <>
          {open && (
            <MModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
              refetch={refetch}
            />
          )}
        </>
      )}
      {route === "Sign-up" && (
        <>
          {open && (
            <MModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}
      {route === "Verification" && (
        <>
          {open && (
            <MModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Navbar;

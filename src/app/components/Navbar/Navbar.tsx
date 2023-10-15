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
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import Image from "next/image";
import avatar from "../../../../public/assets/avatar.jpg";
import { useSocialAuthMutation } from "@/app/redux/features/auth/authApi";
import { toast } from "react-toastify";

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
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();

  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data?.user?.image,
        });
      }
    }
    if (isSuccess) {
      toast.success("Login successfully!");
    }
  }, [data, user]);

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
    <div className="w-full fixed top-0 left-0 z-[9999] backdrop-blur bg-white/50 supports-backdrop-blur:bg-white/60 dark:bg-transparent transition duration-300">
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
                className={`text-[25px] font-Poppins font-[600] text-black dark:text-white whitespace-nowrap`}
              >
                M 1 L K Y
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* only for mobile devices */}
              <div className="hidden 800px:flex items-center justify-center mx-4">
                {user ? (
                  <Link
                    href={"/profile"}
                    className="w-[30px] h-[30px] rounded-full border-solid border-2 border-[#00ffca] dark:border-[#ff3377] overflow-hidden"
                  >
                    <Image
                      src={user.avatar ? user.avatar : avatar}
                      alt="avatar"
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
                {user ? (
                  <Link
                    href={"/profile"}
                    className="w-[30px] h-[30px] rounded-full border-solid border-2 border-[#00ffca] dark:border-[#ff3377] overflow-hidden"
                  >
                    <Image
                      src={user.avatar ? user.avatar : avatar}
                      alt="avatar"
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

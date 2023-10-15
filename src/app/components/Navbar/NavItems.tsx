"use client";
import Link from "next/link";
import React, { FC } from "react";
import { navItemsData } from "../../constants";

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemsData &&
          navItemsData.map((item, index) => (
            <Link href={`${item.path}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#ff3366] text-[#37a39a]"
                    : "dark:text-white text-black"
                } text-[16px] px-6 font-Poppins font-[400]`}
              >
                {item.title}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            <div className="w-full text-center pb-6">
              <Link href="/" passHref>
                <span
                  className={`text-[23px] font-Poppins font-[600] text-black dark:text-white whitespace-nowrap`}
                >
                  M 1 L K Y
                </span>
              </Link>
            </div>
            {navItemsData &&
              navItemsData.map((item, index) => (
                <Link href={`${item.path}`} key={index} passHref>
                  <span
                    className={`${
                      activeItem === index
                        ? "dark:text-[#ff3366] text-[#37a39a]"
                        : "dark:text-white text-black"
                    } block py-5 text-[16px] px-6 font-Poppins font-[400]`}
                  >
                    {item.title}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;

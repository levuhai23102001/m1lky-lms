import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
type Props = {};

const Hero: FC<Props> = (props) => {
  return (
    <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
      <div className="mr-auto place-self-center lg:col-span-7 400px:mt-20 300px:mt-10">
        <h1 className="max-w-2xl my-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl text-black dark:text-white ">
          Improve Your Online
          <br />
          Learning Experience
          <br />
          Better Instantly{" "}
        </h1>
        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          This free and open-source landing page template was built using the
          utility classes from Tailwind CSS and based on the components from the
          Flowbite Library and the Blocks System.
        </p>
      </div>
      <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <Image
          src={require("../../../../public/assets/banner-img.png")}
          alt="hero-image"
          className="object-contain 1100px:max-w-[100%] w-[100%] 1500px:max-w-[100%] h-[auto]"
        />
      </div>
    </div>
  );
};

export default Hero;

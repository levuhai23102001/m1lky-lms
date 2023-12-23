import React, { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { useGetLayoutDataQuery } from "@/app/redux/features/layout/layoutApi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
type Props = {};

const Hero: FC<Props> = (props) => {
  const { data, isLoading } = useGetLayoutDataQuery("Banner", {});
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid max-w-screen-xl px-4 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12  min-h-screen">
          <div className="place-self-center lg:col-span-7 400px:mt-20 300px:mt-10">
            <h1 className="max-w-2xl my-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl text-black dark:text-white ">
              {data?.layout?.banner?.title}
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              {data?.layout?.banner?.subTitle}
            </p>
            <div>
              <div className="flex items-center bg-white rounded-lg overflow-hidden px-2 py-2 justify-between w-[95%] shadow-xl">
                <input
                  className="text-[16px] text-black flex-grow outline-none px-2 bg-white "
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search courses..."
                />
                <div className="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto ">
                  <div
                    onClick={handleSearch}
                    className="dark:bg-[#ff3377] bg-[#5FBDFF] text-white font-Poppins text-[600] text-[16px] rounded-lg px-4 py-2 cursor-pointer"
                  >
                    Search
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image
              src={data?.layout?.banner?.image?.url}
              width={400}
              height={400}
              alt="hero-image"
              className="object-contain 1100px:max-w-[100%] w-[100%] 1500px:max-w-[100%] h-[auto]"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;

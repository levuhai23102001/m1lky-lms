import { useGetHeroDataQuery } from "@/app/redux/features/layout/layoutApi";
import { styles } from "@/app/styles/style";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const EditHero: FC<Props> = (props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }
  }, [data]);

  const handleUpdate = () => {};

  const handleEdit = () => {};

  return (
    <>
      <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
        <div className="mr-auto place-self-center lg:col-span-7 400px:mt-20 300px:mt-10">
          <textarea
            className="text-black dark:text-white resize-none w-full py-4 text-4xl font-extrabold md:text-5xl xl:text-6xl bg-transparent"
            rows={3}
            placeholder="Improve Your Online Learning Experience Better Instantly"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></textarea>
          <textarea
            className="w-full resize-none mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 bg-transparent"
            placeholder="This free and open-source landing page template was built using the utility classes from Tailwind CSS and based on the components from the Flowbite Library and the Blocks System."
            rows={5}
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
          ></textarea>
          <br />
          <br />
          <br />
          <div
            className={`w-[100px] min-h-[40px] h-[40px] inline-flex items-center justify-center py-2 px-6 dark:text-white text-black bg-[#cccccc34] ${
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== image
                ? "!cursor-pointer !bg-[#ff3377]"
                : "!cursor-not-allowed"
            }
                !rounded absolute bottom-10 right-10
            `}
            onClick={
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== image
                ? handleEdit
                : () => null
            }
          >
            Save
          </div>
        </div>
        <div className="lg:mt-0 lg:col-span-5 lg:flex relative">
          <img
            src={image}
            alt="hero-image"
            className="object-contain 1100px:max-w-[100%] w-[100%] 1500px:max-w-[100%] h-[auto]"
          />
          <input
            type="file"
            name=""
            id="banner"
            accept="image/*"
            onChange={handleUpdate}
            className="hidden"
          />
          <label htmlFor="banner" className="absolute bottom-4 right-4 z-20">
            <AiOutlineCamera className="dark:text-white text-black cursor-pointer text-[18px]" />
          </label>
        </div>
      </div>
    </>
  );
};

export default EditHero;

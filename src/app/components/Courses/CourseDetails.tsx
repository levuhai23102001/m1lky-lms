import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  IoCartOutline,
  IoCheckmarkDoneOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { format } from "timeago.js";
import CourseContentList from "./CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import { useLoadUserQuery } from "@/app/redux/features/api/apiSlice";
import Image from "next/image";
import avatar from "../../../../public/assets/avatar.jpg";
import { VscVerifiedFilled } from "react-icons/vsc";

type Props = {
  data: any;
  stripePromise: any;
  clientSecret: string;
  setOpen: any;
  setRoute: any;
};

const CourseDetails = ({
  data,
  stripePromise,
  clientSecret,
  setRoute,
  setOpen: setAuthModal,
}: Props) => {
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [user, setUser] = useState<any>();
  const [open, setOpen] = useState(false);
  const discountPercent =
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;

  const discountPercentPrice = discountPercent.toFixed(0);

  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const handleOrder = () => {
    if (user) {
      setOpen(true);
    } else {
      setRoute("Login");
      setAuthModal(true);
    }
  };

  const appearance = {
    theme: "stripe",
  };

  const options: any = {
    clientSecret,
    appearance,
  };

  return (
    <div className="w-full">
      <div className="w-[90%] 800px:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              {data.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={data.ratings} />
                <h5 className="text-black dark:text-white">
                  {data?.reviews?.length} Reviews
                </h5>
              </div>
              <h5 className="text-black dark:text-white">
                {data.purchased} Students
              </h5>
            </div>
            <br />
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              What you will learn from this course?
            </h1>
            <div>
              {data.benefits?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}
              <br />
            </div>
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              What are the prerequisites for starting this course?
            </h1>
            <div>
              {data.prerequisites?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}
              <br />
            </div>
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              Course Overview
            </h1>
            {/* course content list */}
            <CourseContentList data={data?.courseData} isDemo={true} />
            <br />
            {/* course description */}
            <div className="w-full">
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                Course Details
              </h1>
              <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
                {data.description}
              </p>
            </div>
            <br />
            <div className="w-full">
              <div className="800px:flex items-center">
                <Ratings rating={data?.ratings} />
                <div className="mb-2 800px:mb-[unset]"></div>
                <h5 className="text-[25px] font-Poppins text-black dark:text-white">
                  {Number.isInteger(data?.ratings)
                    ? data?.ratings.toFixed(1)
                    : data?.ratings.toFixed(1)}{" "}
                  Course Rating • {data?.reviews?.length} Reviews
                </h5>
              </div>
              <br />
              {data?.reviews &&
                [...data.reviews].reverse().map((item: any, index: number) => (
                  <div className="w-full pb-4" key={index}>
                    <div className="flex">
                      <div>
                        <Image
                          src={item.user.avatar ? item.user.avatar.url : avatar}
                          alt=""
                          width={50}
                          height={50}
                          className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                      </div>
                      <div className="hidden 800px:block pl-2">
                        <div className="flex items-center">
                          <h5 className="text-[18px] pr-2 text-black dark:text-white">
                            {item.user.name}
                          </h5>
                          <Ratings rating={item.rating} />
                        </div>
                        <p className="text-black dark:text-white">
                          {item.comment}
                        </p>
                        <small className="text-[#000000d1] dark:text-[#ffffff83]">
                          {format(item.createdAt)} •
                        </small>
                      </div>
                    </div>
                    {item.commentReplies.map((item: any, index: number) => (
                      <>
                        <div
                          className="w-full flex 800px:ml-16 my-5 dark:text-white text-black"
                          key={index}
                        >
                          <div className="mt-1">
                            <Image
                              src={
                                item.user.avatar ? item.user.avatar.url : avatar
                              }
                              alt=""
                              width={35}
                              height={35}
                              className="w-[35px] h-[35px] rounded-full object-cover"
                            />
                          </div>
                          <div className="pl-2">
                            <div className="flex items-center">
                              <h5 className="text-[20px] dark:text-white text-black">
                                {item?.user.name}
                              </h5>
                              {item.user.role === "admin" && (
                                <VscVerifiedFilled className="text-[#ff3377] ml-2 text-[20px]" />
                              )}
                            </div>
                            <p className="dark:text-white text-black">
                              {item?.comment}
                            </p>
                            <div className="w-full flex items-center">
                              <small className="dark:text-[#ffffff83] text-[#00000083]">
                                {format(item?.createdAt)} •
                              </small>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                ))}
            </div>
          </div>
          <div className="w-full 800px:w-[35%] relative">
            <div className="sticky top-[100px] left-0 z-50 w-full">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              <div className="flex items-center">
                <h1 className="pt-5 text-[25px] text-black dark:text-white">
                  {data.price === 0 ? "Free" : data.price + "$"}
                </h1>
                <h5 className="pl-3 mt-2 text-[20px] text-black dark:text-white line-through opacity-80">
                  {data.estimatedPrice}$
                </h5>
                <h4 className="pl-5 pt-4 text-[22px] text-black dark:text-white">
                  {discountPercentPrice}% Off
                </h4>
              </div>
              <div className="flex items-center">
                {isPurchased ? (
                  <Link
                    href={`/course-access/${data._id}`}
                    className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer`}
                  >
                    Enter to Course
                  </Link>
                ) : (
                  <div
                    className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer`}
                    onClick={handleOrder}
                  >
                    Buy Now {data.price}$
                  </div>
                )}
              </div>
              <br />
              <p className="pb-1 text-black dark:text-white">
                . Source code included
              </p>
              <p className="pb-1 text-black dark:text-white">
                . Full lifetime access
              </p>
              <p className="pb-1 text-black dark:text-white">
                . Certificate of completion
              </p>
              <p className="pb-3 800px:pb-1 text-black dark:text-white">
                . Premium Support
              </p>
            </div>
          </div>
        </div>
      </div>
      <>
        {open && (
          <div
            className={`w-full h-screen bg-[#0000007d] fixed top-0 left-0 right-0 bottom-0 z-[99999] flex items-center justify-center`}
          >
            <div className="w-full h-[calc(100%-80px)] bg-white rounded-t-xl shadow-xl flex relative animate-fade-up animate-duration-500 animate-delay-500 animate-ease-in-out overflow-auto left-0 top-[40px]">
              <div className="absolute top-2 right-2">
                <IoCloseOutline
                  size={40}
                  className="text-black cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-[50%] flex justify-center">
                <div className="mt-20 px-40">
                  <div className="mb-4 flex items-center text-black gap-1">
                    <IoCartOutline className="text-black" size={20} /> •
                    <span>Checkout</span>
                  </div>

                  <h3 className="text-[18px] font-Poppins font-[500] text-[#1a1a1a99]">
                    {data.name}
                  </h3>
                  <h1 className="text-[36px] font-Poppins font-[600] text-black mb-6">
                    ${data.price.toFixed(2)}
                  </h1>
                  <Image
                    src={data.thumbnail.url}
                    alt=""
                    width={400}
                    height={400}
                    className="rounded"
                  />
                </div>
              </div>
              <div className="w-[50%] flex items-center justify-center shadow-2xl">
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={options}>
                    <CheckOutForm setOpen={setOpen} data={data} user={user} />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetails;

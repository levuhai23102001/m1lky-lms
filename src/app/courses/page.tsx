"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useGetAllCourseUserQuery } from "../redux/features/courses/coursesApi";
import { useGetLayoutDataQuery } from "../redux/features/layout/layoutApi";
import Loader from "../components/Loader/Loader";
import Heading from "../utils/Heading";
import Navbar from "../components/Navbar/Navbar";
import Image from "next/image";
import CourseCard from "../components/Cards/CourseCard";
import Footer from "../components/Footer/Footer";
import { useRouter } from "next/navigation";
type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageNumber = parseInt(searchParams?.get("page") || "1", 10);
  const limit = 1;
  const { data, isLoading } = useGetAllCourseUserQuery({
    pageNumber,
    limit,
  });
  const { data: categoriesData } = useGetLayoutDataQuery("Categories", {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (category === "All") {
      setCourses(data?.courses);
    }
    if (category !== "All") {
      setCourses(
        data?.courses.filter((item: any) => item.categories === category)
      );
    }
  }, [data, category]);

  const categories = categoriesData?.layout.categories;

  const handlePageChange = (newPage: number) => {
    // Update the URL parameters to reflect the new page
    router.push(`/courses?page=${newPage}`);
  };

  return (
    <div className="pt-20">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Heading
            title={"All courses - M1LKY"}
            description={
              "M1LKY is an online learning and teaching marketplace with over 213000 courses and 62 million students. Learn programming, marketing, data science and more."
            }
            keywords="programming community, coding skills, expert insights"
          />
          <Navbar
            open={open}
            setOpen={setOpen}
            activeItem={1}
            route={route}
            setRoute={setRoute}
          />
          <div className="w-[95%] 800px:w-[85%] m-auto pb-16">
            <div className="w-full flex items-center flex-wrap">
              <div
                className={`${
                  category === "All"
                    ? "dark:bg-[#ff3377] bg-[#5fbdff]"
                    : "bg-transparent border dark:border-[#ff3377] border-[#5fbdff]"
                } mx-1 my-4 px-6 py-2 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer dark:text-white text-black`}
                onClick={() => setCategory("All")}
              >
                All
              </div>
              {categories &&
                categories.map((item: any, index: number) => (
                  <div key={index}>
                    <div
                      className={` ${
                        category === item.title
                          ? "dark:bg-[#ff3377] bg-[#5fbdff]"
                          : "bg-transparent border dark:border-[#ff3377] border-[#5fbdff]"
                      } mx-1 my-6 px-6 py-2 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer dark:text-white text-black`}
                      onClick={() => setCategory(item.title)}
                    >
                      {item.title}
                    </div>
                  </div>
                ))}
            </div>
            {/* {courses && courses.length === 0 && (
              <div className="flex items-center justify-center flex-col w-full h-[50vh] mt-4">
                <Image
                  src={require("../../../public/assets/no_data.png")}
                  width={300}
                  height={300}
                  alt=""
                />
                <p className="dark:text-white text-black text-[20px]">
                  {search
                    ? "No courses found"
                    : "No courses found in this category. Please try another one."}
                </p>
              </div>
            )} */}
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
              {courses &&
                courses.map((item: any, index: number) => (
                  <>
                    <CourseCard item={item} key={index} />
                  </>
                ))}
            </div>
            <div className="flex justify-center mt-4">
              {Array.from(
                { length: data?.pagination.totalPages || 1 },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  className={`mx-1 px-3 py-2 rounded-full focus:outline-none ${
                    page === data?.pagination.currentPage
                      ? "bg-[#5fbdff] text-white"
                      : "bg-transparent border dark:border-[#ff3377] border-[#5fbdff] dark:text-white text-black"
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Page;

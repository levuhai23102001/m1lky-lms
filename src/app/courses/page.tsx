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
import LoadMore from "../components/Loader/LoadMore";
type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  let pageNumber = parseInt(searchParams?.get("page") || "1", 10);
  let limit = 8;
  const { data, isLoading } = useGetAllCourseUserQuery({
    pageNumber,
    limit,
  });
  const { data: categoriesData } = useGetLayoutDataQuery("Categories", {});
  const [courses, setCourses] = useState<any[]>([]);
  const [category, setCategory] = useState("");
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    if (category === "") {
      setCourses(data?.courses);
    }
  }, [data, category]);

  const categories = categoriesData?.layout.categories;

  const handlePageChange = (newPage: number) => {
    // Update the URL parameters to reflect the new page
    router.push(`/courses?page=${newPage}`);
  };

  useEffect(() => {
    // Fetch data from the server when the category or page changes
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/v1/courses/get-courses?category=${category}&page=${pageNumber}&limit=${limit}`
        );
        const result = await response.json();
        setCourses(result.courses);
        setTotalPage(result.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [category, pageNumber, limit]);

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
          <div className="w-[95%] 800px:w-[85%] m-auto pb-16">
            <div className="w-full flex items-center flex-wrap">
              <div
                className={`${
                  category === ""
                    ? "dark:bg-[#ff3377] bg-[#5fbdff]"
                    : "bg-transparent border dark:border-[#ff3377] border-[#5fbdff]"
                } mx-1 my-4 px-6 py-2 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer dark:text-white text-black`}
                onClick={() => setCategory("")}
              >
                All
              </div>
              {categories &&
                categories.map((item: any, index: number) => (
                  <div key={index}>
                    <div
                      className={` ${
                        category === item._id
                          ? "dark:bg-[#ff3377] bg-[#5fbdff]"
                          : "bg-transparent border dark:border-[#ff3377] border-[#5fbdff]"
                      } mx-1 my-6 px-6 py-2 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer dark:text-white text-black`}
                      onClick={() => {
                        setCategory(item._id);
                        handlePageChange(1);
                      }}
                    >
                      {item.title}
                    </div>
                  </div>
                ))}
            </div>
            {courses && courses.length === 0 && (
              <div className="flex items-center justify-center flex-col w-full h-[50vh] mt-4">
                <Image
                  src={require("../../../public/assets/no_data.png")}
                  width={300}
                  height={300}
                  alt=""
                />
                <p className="dark:text-white text-black text-[20px]">
                  No courses found in this category. Please try another one.
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
              {courses &&
                courses.map((item: any, index: number) => (
                  <CourseCard item={item} key={index} />
                ))}
            </div>
            {/* {courses && courses.length > 0 && <LoadMore />} */}
            {courses && courses.length > 0 && (
              <div className="flex justify-center mt-4">
                {Array.from(
                  { length: totalPage || 1 },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    className={`mx-1 w-[25px] h-[25px] rounded-full focus:outline-none flex justify-center items-center ${
                      page === data?.pagination.currentPage
                        ? "dark:bg-[#ff3377] bg-[#5fbdff]"
                        : "bg-transparent border dark:border-[#ff3377] border-[#5fbdff] dark:text-white text-black text-[14px]"
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Page;

import { useGetAllCourseUserQuery } from "@/app/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Cards/CourseCard";

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetAllCourseUserQuery({});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  return (
    <div>
      <div className={`w-[90%] 800px:w-[80%] m-auto`}>
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3l lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">
          Expand Your Career{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r dark:from-purple-400 dark:to-pink-600 from-[#96EFFF] to-[#5FBDFF]">
            Opportunity
          </span>{" "}
          <br />
          Opportunity With Our Courses
        </h1>
        <br />
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
          {courses &&
            courses.map((item: any, index: number) => (
              <>
                <CourseCard item={item} key={index} />
                <CourseCard item={item} key={index} />
                <CourseCard item={item} key={index} />
                <CourseCard item={item} key={index} />
                <CourseCard item={item} key={index} />
                <CourseCard item={item} key={index} />
                <CourseCard item={item} key={index} />
                <CourseCard item={item} key={index} />
                <CourseCard item={item} key={index} />
                <CourseCard item={item} key={index} />
                <CourseCard item={item} key={index} />
                <CourseCard item={item} key={index} />
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;

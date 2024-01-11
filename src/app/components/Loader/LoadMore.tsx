"use client";
import { useGetAllCourseUserQuery } from "@/app/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import CourseCard from "../Cards/CourseCard";
type Props = {};

const LoadMore = () => {
  const { ref, inView } = useInView();
  const [courses, setCourses] = useState<any>([]);
  const [pageNumber, setPageNumber] = useState(2);
  const limit = 8;
  const { data, isLoading } = useGetAllCourseUserQuery({
    pageNumber,
    limit,
  });

  const totalPages = data?.pagination.totalPages || 1;

  useEffect(() => {
    if (inView && !isLoading) {
      setCourses((prevCourses: any) => [...prevCourses, ...data.courses]);
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  }, [inView, isLoading, data]);

  return (
    <>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
        {courses &&
          courses.map((item: any, index: number) => (
            <CourseCard item={item} key={index} />
          ))}
      </div>
      {pageNumber <= totalPages && <div ref={ref}>Load more</div>}
    </>
  );
};

export default LoadMore;

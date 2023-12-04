"use client";
import React from "react";
import CourseDetailsPage from "../../components/Courses/CourseDetailsPage";
type Props = {};

const page = ({ params }: any) => {
  return (
    <div className="pt-20">
      <CourseDetailsPage id={params.id} />
    </div>
  );
};

export default page;

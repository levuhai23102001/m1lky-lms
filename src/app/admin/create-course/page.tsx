"use client";
import React from "react";
import AdminSidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import Heading from "@/app/utils/Heading";
import CreateCourse from "@/app/components/Admin/Course/CreateCourse";
import AdminProtected from "@/app/hooks/adminProtected";
import DashboardHero from "@/app/components/Admin/Dashboard/DashboardHero";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <AdminProtected>
        <Heading
          title="M1LKY // Admin - Create Course"
          description="M1LKY is an online learning and teaching marketplace with over 213000 courses and 62 million students. Learn programming, marketing, data science and more."
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex">
          <div className="1500px:w-[18%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
            <CreateCourse />
          </div>
        </div>
      </AdminProtected>
    </>
  );
};

export default page;

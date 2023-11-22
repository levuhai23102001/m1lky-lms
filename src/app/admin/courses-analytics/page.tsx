"use client";
import CourseAnalytics from "@/app/components/Admin/Analytics/CourseAnalytics";
import DashboardHero from "@/app/components/Admin/Dashboard/DashboardHero";
import AdminSidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <AdminProtected>
        <Heading
          title="M1LKY // Admin - Courses Analytics"
          description="M1LKY is an online learning and teaching marketplace with over 213000 courses and 62 million students. Learn programming, marketing, data science and more."
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[18%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
            <CourseAnalytics />
          </div>
        </div>
      </AdminProtected>
    </>
  );
};

export default page;

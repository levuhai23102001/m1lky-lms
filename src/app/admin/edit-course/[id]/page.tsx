"use client";
import React from "react";
import AdminSidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import Heading from "@/app/utils/Heading";
import DashboardHeader from "@/app/components/Admin/Dashboard/DashboardHeader";
import EditCourse from "@/app/components/Admin/Course/EditCourse";
import AdminProtected from "@/app/hooks/adminProtected";

type Props = {};

const page = ({ params }: any) => {
  const id = params.id;

  return (
    <>
      <AdminProtected>
        <Heading
          title="M1LKY // Admin - Edit Course"
          description="M1LKY is an online learning and teaching marketplace with over 213000 courses and 62 million students. Learn programming, marketing, data science and more."
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex">
          <div className="1500px:w-[18%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHeader />
            <EditCourse id={id} />
          </div>
        </div>
      </AdminProtected>
    </>
  );
};

export default page;

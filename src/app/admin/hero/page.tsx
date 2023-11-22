"use client";
import AdminSidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import EditHero from "@/app/components/Admin/Customization/EditHero";
import DashboardHero from "@/app/components/Admin/Dashboard/DashboardHero";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <AdminProtected>
        <Heading
          title="M1LKY // Admin - Hero"
          description="M1LKY is an online learning and teaching marketplace with over 213000 courses and 62 million students. Learn programming, marketing, data science and more."
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[18%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
            <EditHero />
          </div>
        </div>
      </AdminProtected>
    </>
  );
};

export default page;

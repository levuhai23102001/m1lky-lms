"use client";
import React from "react";
import AdminProtected from "../hooks/adminProtected";
import Heading from "../utils/Heading";
import AdminSidebar from "../components/Admin/Sidebar/AdminSidebar";
import DashboardHero from "../components/Admin/Dashboard/DashboardHero";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="M1LKY // Admin"
          description="M1LKY is an online learning and teaching marketplace with over 213000 courses and 62 million students. Learn programming, marketing, data science and more."
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex">
          <div className="1500px:w-[18%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;

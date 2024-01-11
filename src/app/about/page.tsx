"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Navbar from "../components/Navbar/Navbar";
import About from "./About";
import Footer from "../components/Footer/Footer";

type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <Heading
        title="About us - M1LKY"
        description={
          "M1LKY is an online learning and teaching marketplace with over 213000 courses and 62 million students. Learn programming, marketing, data science and more."
        }
        keywords="programming community, coding skills, expert insights"
      />
      <About />
      <Footer />
    </div>
  );
};

export default Page;

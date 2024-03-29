"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Courses from "./components/Routes/Courses";
import Reviews from "./components/Routes/Reviews";
import FAQ from "./components/Routes/FAQ";
import Footer from "./components/Footer/Footer";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Heading
        title="M1LKY // Learning Management System"
        description="M1LKY is an online learning and teaching marketplace with over 213000 courses and 62 million students. Learn programming, marketing, data science and more."
        keywords="Programming,MERN,Redux,Machine Learning"
      />
      {/* <Navbar
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      /> */}
      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;

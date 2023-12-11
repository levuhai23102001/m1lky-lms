"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Navbar from "../components/Navbar/Navbar";
import About from "./About";
import Footer from "../components/Footer/Footer";

type Props = {};

const Page = (props: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Heading
        title="About us - M1LKY"
        description={
          "M1LKY is an online learning and teaching marketplace with over 213000 courses and 62 million students. Learn programming, marketing, data science and more."
        }
        keywords="programming community, coding skills, expert insights"
      />
      <Navbar
        open={open}
        setOpen={setOpen}
        activeItem={2}
        route={route}
        setRoute={setRoute}
      />
      <About />
      <Footer />
    </div>
  );
};

export default Page;

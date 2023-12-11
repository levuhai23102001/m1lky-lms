"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Policy from "./Policy";

type Props = {};

const Page = (props: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Heading
        title="Policy - M1LKY"
        description={
          "M1LKY is an online learning and teaching marketplace with over 213000 courses and 62 million students. Learn programming, marketing, data science and more."
        }
        keywords="programming community, coding skills, expert insights"
      />
      <Navbar
        open={open}
        setOpen={setOpen}
        activeItem={3}
        route={route}
        setRoute={setRoute}
      />
      <Policy />
      <Footer />
    </div>
  );
};

export default Page;

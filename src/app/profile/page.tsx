"use client";
import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Navbar from "../components/Navbar/Navbar";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";
import { useLoadUserQuery } from "../redux/features/api/apiSlice";
import Footer from "../components/Footer/Footer";

type Props = {};

const Page: FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(6);
  const [route, setRoute] = useState("Login");
  // const { user } = useSelector((state: any) => state.auth);
  const { data: userData } = useLoadUserQuery(undefined, {});
  const user = userData?.user;

  return (
    <div>
      <Protected>
        <Heading
          title={`${user?.name} // My Profile`}
          description="M1LKY is an online learning and teaching marketplace with over 213000 courses and 62 million students. Learn programming, marketing, data science and more."
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <Navbar
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          route={route}
          setRoute={setRoute}
        />
        <Profile user={user} />
        <Footer />
      </Protected>
    </div>
  );
};

export default Page;

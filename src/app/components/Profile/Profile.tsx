import React, { FC, useEffect, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogoutQuery } from "@/app/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../Cards/CourseCard";
import { useGetAllCourseUserQuery } from "@/app/redux/features/courses/coursesApi";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });
  const [active, setActive] = useState(1);
  const [courses, setCourses] = useState<any[]>([]);
  const { data, isLoading } = useGetAllCourseUserQuery({});

  const logoutHandler = async () => {
    await signOut();
    setLogout(true);
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  useEffect(() => {
    const redirectToHome = async () => {
      if (logout) {
        window.location.href = "/";
      }
    };

    redirectToHome();
  }, [logout]);

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourses: any) =>
          data.courses.find((course: any) => course._id === userCourses._id)
        )
        .filter((course: any) => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data]);

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[360px] h-[450px] dark:bg-slate-900 bg-opacity-90 bg-white border dark:border-[#ffffff1d] border-[#00000014] rounded-[10px] shadow-lg dark:shadow-lg mt-[120px] mb-[80px] sticky overflow-hidden ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SidebarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logoutHandler}
        />
      </div>
      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[120px]">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}
      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[120px]">
          <ChangePassword />
        </div>
      )}
      {active === 3 && (
        <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8 mt-[120px]">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-3 1500px:gap-[35px] mb-12 border-0">
            {courses.map((item: any, index: number) => (
              <CourseCard key={index} item={item} isProfile={true} />
            ))}
          </div>
          {courses.length === 0 && (
            <h1 className="text-center text-[18px] text-black dark:text-white font-Poppins">
              You don`t have any purchased courses!
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;

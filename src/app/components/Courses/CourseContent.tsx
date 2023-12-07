import { useGetCourseContentQuery } from "@/app/redux/features/courses/coursesApi";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import Navbar from "../Navbar/Navbar";
import CourseContentList from "./CourseContentList";

type Props = {
  id: string;
  user: any;
};

const CourseContent = ({ id, user }: Props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const { data: contentData, isLoading } = useGetCourseContentQuery(id);
  const data = contentData?.content;
  const [activeVideo, setActiveVideo] = useState(0);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar
            open={open}
            setOpen={setOpen}
            activeItem={1}
            route={route}
            setRoute={setRoute}
          />
          <div className="w-full grid 800px:grid-cols-10">
            <Heading
              title={data[activeVideo]?.title}
              description="anything"
              keywords={data[activeVideo]?.tags}
            />
            <div className="col-span-7">
              <CourseContentMedia
                data={data}
                user={user}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
              />
            </div>
            <div className="hidden 800px:block 800px:col-span-3">
              <CourseContentList
                data={data}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseContent;

import React, { FC, ReactNode, useState } from "react";
import Navbar from "../components/Navbar/Navbar";

type Props = {};

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Navbar open={open} setOpen={setOpen} route={route} setRoute={setRoute} />
      {children}
    </div>
  );
};

export default MainLayout;

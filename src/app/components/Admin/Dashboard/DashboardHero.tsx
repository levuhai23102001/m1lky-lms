import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardWidgets from "./DashboardWidgets";

type Props = {
  isDashboard?: true;
};

const DashboardHero = ({ isDashboard }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DashboardHeader open={open} setOpen={setOpen} />
      {isDashboard && <DashboardWidgets open={open} />}
    </div>
  );
};

export default DashboardHero;

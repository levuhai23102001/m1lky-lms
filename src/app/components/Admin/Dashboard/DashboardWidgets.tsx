import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrderAnalytics from "../Analytics/OrderAnalytics";
import AllInvoices from "../Order/AllInvoices";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/app/redux/features/analytics/analyticsApi";
type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const [comparePercent, setComparePercent] = useState();
  const [usersPercent, setUsersPercent] = useState<any>();
  const [ordersPercent, setOrdersPercent] = useState<any>();
  const { data: usersData, isLoading: usersLoading } =
    useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticsQuery({});

  useEffect(() => {
    if (usersLoading && ordersLoading) {
      return;
    } else {
      if (usersData && ordersData) {
        const usersLastTwoMonths = usersData.users.last12Months.slice(-2);
        const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2);
        if (
          usersLastTwoMonths.length === 2 &&
          ordersLastTwoMonths.length === 2
        ) {
          const usersCurrentMonth = usersLastTwoMonths[1].count;
          const usersPreviousMonth = usersLastTwoMonths[0].count;
          const ordersCurrentMonth = ordersLastTwoMonths[1].count;
          const ordersPreviousMonth = ordersLastTwoMonths[0].count;

          const usersPercentChange =
            usersPreviousMonth !== 0
              ? ((usersCurrentMonth - usersPreviousMonth) /
                  usersPreviousMonth) *
                100
              : 100;
          const ordersPercentChange =
            ordersPreviousMonth !== 0
              ? ((ordersCurrentMonth - ordersPreviousMonth) /
                  ordersPreviousMonth) *
                100
              : 100;

          setUsersPercent({
            currentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
            percentChange: usersPercentChange,
          });

          setOrdersPercent({
            currentMonth: ordersCurrentMonth,
            previousMonth: ordersPreviousMonth,
            percentChange: ordersPercentChange,
          });
        }
      }
    }
  }, [usersLoading, ordersLoading, usersData, ordersData]);

  return (
    <div className="mt-[30px] min-h-screen">
      <div className="grid grid-cols-[75%,25%]">
        <div className="p-8">
          <UserAnalytics isDashboard={true} />
        </div>
        <div className="pt-[80px] pr-8">
          <div className="w-full dark:bg-[#111c43] rounded-sm shadow">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <BiBorderLeft className="dark:text-[#ff3377] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {ordersPercent?.currentMonth}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  Sales Obtained
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={ordersPercent?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <h5 className="dark:text-[#fff] text-black text-center pt-4">
                  {ordersPercent?.percentChange > 0
                    ? "+" + ordersPercent?.percentChange.toFixed(2)
                    : "-" + ordersPercent?.percentChange.toFixed(2)}
                  %
                </h5>
              </div>
            </div>
          </div>
          <div className="w-full dark:bg-[#111c43] rounded-sm shadow my-8">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <PiUsersFourLight className="dark:text-[#ff3377] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {usersPercent?.currentMonth}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  New Users
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={usersPercent?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <h5 className="dark:text-[#fff] text-black text-center pt-4">
                  {usersPercent?.percentChange > 0
                    ? "+" + usersPercent?.percentChange.toFixed(2)
                    : "-" + usersPercent?.percentChange.toFixed(2)}
                  %
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[65%,35%] mt-[-20px]">
        <div className="dark:bg-[#111c43] w-[94%] mt-[30px] h-[40vh] shadow-sm m-auto">
          <OrderAnalytics isDashboard={true} />
        </div>
        <div className="p-5">
          <h5 className="dark:text-[#fff] text-black text-[20px] font-[400] font-Poppins pb-3">
            Recent Transactions
          </h5>
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;

import { useGetOrdersAnalyticsQuery } from "@/app/redux/features/analytics/analyticsApi";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";
type Props = {
  isDashboard?: boolean;
};

const OrderAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});

  //   const analyticsData = [
  //     { name: "Page A", count: 242 },
  //     { name: "Page B", count: 4342 },
  //     { name: "Page C", count: 5554 },
  //     { name: "Page D", count: 742 },
  //     { name: "Page E", count: 2343 },
  //     { name: "Page F", count: 793 },
  //     { name: "Page G", count: 2879 },
  //     { name: "Page H", count: 5007 },
  //     { name: "Page I", count: 7890 },
  //     { name: "Page O", count: 2756 },
  //     { name: "Page M", count: 5660 },
  //     { name: "Page N", count: 7666 },
  //   ];

  const analyticsData: any = [];

  data &&
    data.orders.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${isDashboard ? "h-[30vh]" : "h-screen"}`}>
          <div
            className={`${
              isDashboard ? "mt-[0px] pl-[40px] mb-2" : "mt-[50px]"
            }`}
          >
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20px]"
              } px-5 !text-start`}
            >
              Orders Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Last 12 months analytics data
              </p>
            )}
          </div>
          <div
            className={`w-full ${
              !isDashboard ? "h-[90%]" : "h-full"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={!isDashboard ? "50%" : "100%"}
            >
              <LineChart
                width={500}
                height={300}
                data={analyticsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {!isDashboard && <Legend />}
                <Line type="monotone" dataKey="count" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderAnalytics;

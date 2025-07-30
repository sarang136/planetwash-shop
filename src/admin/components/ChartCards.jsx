import React, { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, CheckCircle } from "lucide-react";
import { BsBasket3Fill } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa6";
import { useGetUserOrdersQuery } from "../redux/appSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AnimatedNumber = ({ value, duration = 1500 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const progressRatio = Math.min(progress / duration, 1);
      const newValue = Math.floor(progressRatio * value);
      setDisplayValue(newValue);

      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(step);
    return () => setDisplayValue(0);
  }, [value, duration]);

  return <>{displayValue.toLocaleString()}</>;
};

const IconStatsCards = () => {
  const { user } = useSelector((state) => state.auth);
  const { data = [], isLoading, error } = useGetUserOrdersQuery(user?._id);

  const now = new Date();
  const oneWeekAgo = new Date(now);
  oneWeekAgo.setDate(now.getDate() - 7);
  const twoWeeksAgo = new Date(now);
  twoWeeksAgo.setDate(now.getDate() - 14);

  const thisWeekOrders = data.filter(
    (order) => new Date(order.createdAt) >= oneWeekAgo
  );

  const lastWeekOrders = data.filter(
    (order) =>
      new Date(order.createdAt) >= twoWeeksAgo &&
      new Date(order.createdAt) < oneWeekAgo
  );

  const thisWeekRevenue = thisWeekOrders.reduce(
    (sum, item) => sum + (item.totalAmount || 0),
    0
  );

  const lastWeekRevenue = lastWeekOrders.reduce(
    (sum, item) => sum + (item.totalAmount || 0),
    0
  );

  const orderTrendUp = thisWeekOrders.length >= lastWeekOrders.length;
  const revenueTrendUp = thisWeekRevenue >= lastWeekRevenue;

  const totalRevenueAllTime = data.reduce(
    (sum, item) => sum + (item.totalAmount || 0),
    0
  );

  

  const stats = [
    {
      icon: <BsBasket3Fill className="text-blue-500 w-[5rem] h-[5rem] p-3" />,
      title: "Total Orders (This Week)",
      value: thisWeekOrders.length,
      trend: orderTrendUp
        ? `Increased by ${thisWeekOrders.length - lastWeekOrders.length}`
        : `Decreased by ${lastWeekOrders.length - thisWeekOrders.length}`,
      trendColor: orderTrendUp ? "text-green-500" : "text-red-500",
      path: "/manageUsers",
      status: orderTrendUp ? "up" : "down",
    },
    {
      icon: <FaCreditCard className="text-blue-500 w-[5rem] h-[5rem] p-3" />,
      title: "Total Revenue (All Time)",
      value: totalRevenueAllTime,
      trend: revenueTrendUp
        ? `This week increased by ₹${(thisWeekRevenue - lastWeekRevenue).toLocaleString()}`
        : `This week decreased by ₹${(lastWeekRevenue - thisWeekRevenue).toLocaleString()}`,
      trendColor: revenueTrendUp ? "text-green-500" : "text-red-500",
      path: "",
      status: revenueTrendUp ? "up" : "down",
    },
  ];

  return (
    <div className="grid grid-cols-1 w-[100vw] md:w-[unset] md:grid-cols-2 gap-2 p-4 md:gap-6 md:p-4 container">
      {stats.map((stat, index) => (
        <Link to={stat.path} key={index} className="block">
          <div className="bg-white rounded-2xl p-[0.7rem] shadow-md md:flex md:justify-between items-start hover:shadow-lg transition-shadow duration-200">
            <div className="flex gap-4 items-start">
              <div className="bg-blue-100 p-0 rounded-xl md:p-4">{stat.icon}</div>
              <div>
                <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
                <p className="text-2xl font-semibold text-[#1f2454]">
                  <AnimatedNumber value={stat.value} duration={1500} />
                </p>
                <div
                  className={`flex items-center text-sm font-medium ${stat.trendColor} mt-1`}
                >
                  {stat.status === "up" ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                  <span className="ml-1">{stat.trend}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center text-green-500 text-sm mt-2 md:mt-0">
              <CheckCircle size={16} className="mr-1" />
              On track
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default IconStatsCards;




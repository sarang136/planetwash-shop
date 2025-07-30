import React, { useState, useEffect } from "react";
import PickupSchedule from "./orderPages/PickupSchedule";
import Ongoing from "./orderPages/Ongoing";
import Completed from "./orderPages/Completed";
import { useNavigate } from "react-router-dom";
import { useGetUserOrdersQuery } from "../redux/appSlice";
import ShimmerUiForOrders from "../../ShimmerUis/ShimmerUiForOrders";
import { useSelector } from "react-redux";
import RecentOrders from "./orderPages/RecentOrders";
import Rejected from "./orderPages/Rejected";

const tabs = ["All Orders", "Recent Orders", "Pickup Schedule", "Ongoing", "Rejected", "Completed"];

const ManageUsers = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("All Orders");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const { data = [], isLoading } = useGetUserOrdersQuery(user?._id);
  console.log("userID",data);


  

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) return <ShimmerUiForOrders />;

  return (
    <div className="p-4 md:p-[1rem] w-[100vw] md:w-full cursor-pointer">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4 md:gap-[70px]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative text-[12px] font-semibold md:text-sm px-2 pb-1 transition-all duration-300 hover:text-black
    ${activeTab === tab ? "text-black" : "text-gray-400"}
    group
  `}
            >
              {tab}
              <span
                className={`
      absolute left-0 bottom-0 h-[2px] bg-black transition-all duration-300
      ${activeTab === tab
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                  }
    `}
              ></span>
            </button>

          ))}
        </div>
      </div>

      {activeTab === "All Orders" && (
        <div className="md:w-[unset] md:p-0">
          <div className="overflow-y-scroll bg-white rounded-xl shadow max-h-[75vh] px-0 md:px-4">
            {isMobile ? (
              <div className="p-2 flex flex-col gap-4">
                {data.length === 0 ? (
                  <p className="text-center text-gray-500 py-6">No Orders found</p>
                ) : (
                  data.map((order, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg shadow border">
                      <div>
                        <label className="text-xs font-semibold">Name</label>
                        <input
                          type="text"
                          value={order.userId?.Name || ""}
                          disabled
                          className="w-full bg-gray-100 rounded px-2 py-1 text-sm mt-1"
                          onClick={() => navigate(`userData/${order._id}`)}
                        />
                      </div>
                      <div className="mt-2">
                        <label className="text-xs font-semibold">Contact</label>
                        <input
                          type="text"
                          value={order.userId?.contactNo || ""}
                          disabled
                          className="w-full bg-gray-100 rounded px-2 py-1 text-sm mt-1"
                        />
                      </div>
                      <div className="mt-2">
                        <label className="text-xs font-semibold">Email</label>
                        <input
                          type="email"
                          value={order.userId?.email || ""}
                          disabled
                          className="w-full bg-gray-100 rounded px-2 py-1 text-sm mt-1"
                        />
                      </div>
                      <div className="mt-2">
                        <label className="text-xs font-semibold">Pickup</label>
                        <input
                          type="text"
                          value={order.pickupDateTime || ""}
                          disabled
                          className="w-full bg-gray-100 rounded px-2 py-1 text-sm mt-1"
                        />
                      </div>
                      <div className="mt-2">
                        <label className="text-xs font-semibold">Address</label>
                        <input
                          type="text"
                          value={`${order.addressId?.location || ""}, ${order.addressId?.city || ""}, ${order.addressId?.pincode || ""}`}
                          disabled
                          className="w-full bg-gray-100 rounded px-2 py-1 text-sm mt-1"
                        />
                      </div>
                      <div className="mt-2">
                        <label className="text-xs font-semibold">Payment</label>
                        <input
                          type="text"
                          value={"Cash On Delivery"}
                          disabled
                          className="w-full bg-gray-100 rounded px-2 py-1 text-sm mt-1 capitalize"
                        />
                      </div>

                    </div>
                  ))
                )}
              </div>
            ) : (
              <>
                {data.length === 0 ? (
                  <p className="text-center text-gray-500 py-6">No orders found</p>
                ) : (
                  <table className="md:min-w-full text-[10px] md:text-sm text-left">
                    <thead className="text-black font-semibold sticky top-0 bg-white">
                      <tr>
                        <th className="p-4 md:p-6">Name</th>
                        <th className="p-4">Contact</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Pickup</th>
                        <th className="p-4">Address</th>
                        <th className="p-4">Payment</th>
                        <th className="p-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-400 border-t divide-y">
                      {data.map((order, index) => (
                        <tr key={index}>
                          <td
                            className="px-4 py-2 cursor-pointer"
                            onClick={() => navigate(`/userData/${order._id}`)}
                          >
                            {order?.addressId?.name}
                          </td>
                          <td className="p-2 md:p-6">{order?.userId?.contactNo}</td>
                          <td className="px-4 py-2">{order?.addressId?.email}</td>
                          <td className="px-4 py-2">{order?.pickupDateTime}</td>
                          <td className="px-4 py-4  ">
                            <span> {order.addressId?.location}</span>, <span>{order.addressId?.city}</span>,
                          </td>
                          <td className="px-4 py-2">Cash On Delivery</td>
                          <td
                            className={`px-4 py-2 italic font-bold text-center break-words whitespace-normal max-w-[120px] ${order?.orderStatus === "completed"
                              ? "text-green-600"
                              : order?.orderStatus === "rejected"
                                ? "text-red-500"
                                : order?.orderStatus === "ongoing"
                                  ? "text-blue-700"
                                  : order?.orderStatus === "pending"
                                    ? "text-yellow-500"
                                    : "text-gray-500"
                              }`}
                          >
                            {order?.orderStatus || "N/A"}
                          </td>



                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>
        </div>
      )}

      <div className="cursor-pointer">
        {activeTab === "Recent Orders" && <RecentOrders />}
        {activeTab === "Pickup Schedule" && <PickupSchedule />}
        {activeTab === "Ongoing" && <Ongoing />}
        {activeTab === "Rejected" && <Rejected />}
        {activeTab === "Completed" && <Completed />}
      </div>
    </div>
  );
};

export default ManageUsers;

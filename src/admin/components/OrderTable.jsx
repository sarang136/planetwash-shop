import React, { useState } from "react";
import { useGetUserOrdersQuery } from "../redux/appSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ShimmerUiForOrders from "../../ShimmerUis/ShimmerUiForOrders";

const OrderTable = ({ shopId }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const { data, isLoading, isError } = useGetUserOrdersQuery(user?._id);

  if (isLoading) return <div className="text-center"><ShimmerUiForOrders /></div>;
  if (isError || (data && data.message === "No orders found for this shop")) {
    return <div className="text-center text-gray-500 py-6">No Orders Available</div>;
  }

  const todayDate = new Date().toISOString().split("T")[0];

  const allOrders = Array.isArray(data) ? data : [];

  const currentDateOrders = allOrders.filter((order) => {
    const orderDate = new Date(order?.createdAt).toISOString().split("T")[0];
    return orderDate === todayDate;
  });

  return (
    <div className="md:w-[unset] md:p-4 p-4">
      <div className="flex justify-between items-center">
        <h1 className="py-4 font-bold cursor-pointer">Today's Order</h1>
        <p className="text-gray-500 transition-[0.3s] hover:text-black font-bold cursor-pointer px-4" 
        onClick={()=> navigate("/manageUsers")}
        >View All Orders</p>
      </div>

      <div className="hidden md:block overflow-y-scroll bg-white rounded-xl shadow max-h-[40vh] px-0 md:px-4">
        <table className="min-w-full text-sm text-left">
          <thead className="text-black font-semibold sticky top-0 bg-white z-10">
            <tr>
              <th className="px-4 py-4 whitespace-nowrap">Customer Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Email</th>
              <th className="px-4 py-2 whitespace-nowrap">Contact No</th>
              <th className="px-4 py-2 whitespace-nowrap">Address</th>
              <th className="px-4 py-2 whitespace-nowrap">Payment Method</th>
              <th className="px-4 py-2 whitespace-nowrap">Created At</th>
              <th className="px-4 py-2 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-500 border-t cursor-pointer divide-y">
            {currentDateOrders.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-6">No orders for today.</td>
              </tr>
            ) : (
              currentDateOrders.map((res, index) => (
                <tr key={index}>
                  <td className="px-4 py-2" onClick={() => navigate(`/userData/${res._id}`)}>
                    {res.addressId?.name || "N/A"}
                  </td>
                  <td className="px-4 py-2">{res.addressId?.email || "N/A"}</td>
                  <td className="px-4 py-2">{res.addressId?.contactNo || "N/A"}</td>
                  <td className="px-4 py-2">
                    {res.addressId?.location}, {res.addressId?.city}, {res.addressId?.pincode}
                  </td>
                  <td className="px-4 py-2">Cash On Delivery</td>
                  <td className="px-4 py-2">{new Date(res?.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <button className="bg-[#041434] text-[10px] text-white px-4 py-2 rounded-lg whitespace-nowrap bg-[#8EDF4C]"
                    onClick={()=> navigate('/map')}
                    >
                      Schedule Pickup
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {currentDateOrders.length === 0 ? (
          <div className="text-center text-gray-500">No orders for today.</div>
        ) : (
          currentDateOrders.map((res, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md text-sm text-gray-700 flex flex-col gap-1"
            >
              <div>
                <span className="font-semibold">Customer:</span>{" "}
                <span
                  onClick={() => navigate(`/userData/${res._id}`)}
                  className="text-blue-700 underline cursor-pointer"
                >
                  {res.addressId?.name || "N/A"}
                </span>
              </div>
              <div><span className="font-semibold">Email:</span> {res.addressId?.email || "N/A"}</div>
              <div><span className="font-semibold">Contact:</span> {res.addressId?.contactNo || "N/A"}</div>
              <div>
                <span className="font-semibold">Address:</span>{" "}
                {res.addressId?.location}, {res.addressId?.city}, {res.addressId?.pincode}
              </div>
              <div><span className="font-semibold">Payment:</span> Cash On Delivery</div>
              <div><span className="font-semibold">Created:</span> {new Date(res?.createdAt).toLocaleString()}</div>
              <button
                className="bg-[#041434] text-white text-xs py-2 rounded-lg mt-2"
                onClick={() => setShowModal(true)}
              >
                Schedule Pickup
              </button>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 md:p-10 rounded-[40px] shadow-lg w-[90%] md:w-[700px] flex flex-col md:flex-row gap-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-4">June 2025</h2>
              <div className="grid grid-cols-7 gap-2 text-center text-sm">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day, i) => (
                  <div key={i} className="font-bold">{day}</div>
                ))}
                {[...Array(30)].map((_, i) => (
                  <button
                    key={i}
                    className={`py-1 rounded-full ${i === 7 ? "bg-[rgba(5,35,68,1)] text-white" : "hover:bg-gray-200"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-4">Select Time</h2>
              <input
                type="time"
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring"
              />
              <button
                onClick={() => setShowModal(false)}
                className="w-full mt-6 bg-[rgba(5,35,68,1)] text-white py-2 rounded-lg"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;

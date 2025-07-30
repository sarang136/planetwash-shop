import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OrderTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const navigate = useNavigate();

  const orders = [
    {
      name: "John doe",
      contact: "8978765654",
      email: "john@gmail.com",
      service: "Washing & Ironing",
      address: "Golden City Center, Chh Sambhajinagar",
      payment: "Cash on Delivery",
    },
    {
      name: "Jane Smith",
      contact: "9856741230",
      email: "jane@gmail.com",
      service: "Dry Cleaning",
      address: "MG Road, Chh Sambhajinagar",
      payment: "Online Payment",
    },
  ];

  const handleProceed = () => {
    console.log("Scheduled Pickup:", selectedDate.toDateString(), selectedTime);
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 px-5">
        <h2 className="text-lg font-semibold text-black">Today’s Orders</h2>
        <button
          className="text-sm text-gray-400 hover:text-black"
          onClick={() => navigate("/manageUsers")}
        >
          View All
        </button>
      </div>

      <div className="px-5 py-3">
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="text-left text-black font-semibold">
              <tr>
                <th className="px-4 py-3">Customer Name</th>
                <th className="px-4 py-3">Contact No</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Service Type</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Payment Method</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {orders.map((order, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{order.name}</td>
                  <td className="px-4 py-2">{order.contact}</td>
                  <td className="px-4 py-2">{order.email}</td>
                  <td className="px-4 py-2">{order.service}</td>
                  <td className="px-4 py-2">{order.address}</td>
                  <td className="px-4 py-2">{order.payment}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-[#041434] text-white px-4 py-2 rounded-lg"
                      onClick={() => setShowModal(true)}
                    >
                      Schedule Pickup
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[500px] max-w-3xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Select Date & Time</h2>
              <button
                className="text-gray-400 hover:text-black text-xl"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-[96px]">
              {/* Calendar */}
              <div>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  inline
                />
              </div>

              {/* Time Picker + Proceed Button */}
              <div className="flex flex-col justify-center">
                <label className="font-medium mb-2">Select Time</label>
                <input
                  type="time"
                  className="border rounded-lg px-4 py-2 w-full"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
                <button
                  className="bg-[#041434] text-white px-6 py-2 rounded-lg mt-4"
                  onClick={handleProceed}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;

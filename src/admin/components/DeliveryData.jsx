import { useEffect, useState } from "react";
import { useGetAllOrdersByDeliveryBoyQuery } from "../redux/appSlice";
import { useNavigate } from "react-router-dom";

const DeliveryData = ({ deliveryBoyId, shopDetails }) => {
  const [activeTab, setActiveTab] = useState('pending');

  const navigate = useNavigate();
  const { data: ordersData, isLoading, isError } = useGetAllOrdersByDeliveryBoyQuery(deliveryBoyId);

  useEffect(() => {
    console.log('Fetched Orders:', ordersData);
  }, [ordersData]);

  const orderList = ordersData?.orders || [];

  const filteredOrders = orderList.filter(order => {
    if (activeTab === 'pending') return order.orderStatus === 'pending' || order.orderStatus === 'pickup';
    if (activeTab === 'ongoing') return order.orderStatus === 'ongoing';
    if (activeTab === 'past') return order.orderStatus === 'completed';
    if (activeTab === 'rejected') return order.orderStatus === 'orderRejectByDeliveryBoy';
    return false;
  });

  if (isLoading) return <p>Loading orders...</p>;
  if (isError) return <p>No data fetched</p>;

  if (!shopDetails) {
    console.warn('No shopDetails found!');
    return <p>No shop details found for this delivery boy.</p>;
  }

  
  return (
    <div className="p-4 bg-white rounded-2xl max-h-[45vh] overflow-y-scroll">
      <div className="flex justify-start space-x-6 border-b mb-4 ">
        {["pending", "ongoing", "past", "rejected"].map(tab => (
          <button
            key={tab}
            className={`pb-2 ${activeTab === tab
              ? 'text-green-500 border-b-2 border-green-400 font-semibold'
              : 'text-gray-500'
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "pending" ? "Assigned Orders"
              : tab === "ongoing" ? "Ongoing Orders"
                : tab === "past" ? "Past Orders"
                  : "Orders Rejected By Delivery Boys"}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto mt-6 rounded-md border border-gray-200">
        <table className="min-w-full bg-white text-sm text-gray-800">
          <thead className="bg-gray-100 text-left text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Customer Name</th>
              <th className="px-4 py-3">Contact No</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Total Items</th>
              <th className="px-4 py-3">Delivery Type</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Amount</th>
              {/* <th className="px-4 py-3">Status</th> */}
              {activeTab === "rejected" && (
                <th className="px-4 py-3">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={activeTab === "rejected" ? 9 : 8} className="text-center px-4 py-6 text-gray-400">
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-3">{order.addressId?.name || 'N/A'}</td>
                  <td className="px-4 py-3">{order.userId?.contactNo || 'N/A'}</td>
                  <td className="px-4 py-3">{order.addressId?.email || 'N/A'}</td>
                  <td className="px-4 py-3">{order.services?.length || 0}</td>
                  <td className="px-4 py-3">{order.deliveryType || 'N/A'}</td>
                  <td className="px-4 py-3 whitespace-pre-line">{order.addressId?.location || 'N/A'}</td>
                  <td className="px-4 py-3">₹{order.totalAmount || '0'}</td>
                  {/* <td className={`px-4 py-3 font-semibold 
                    ${order.orderStatus === 'pending' || order.orderStatus === 'pickup'
                      ? 'text-red-600'
                      : order.orderStatus === 'ongoing'
                        ? 'text-blue-600'
                        : order.orderStatus === 'orderRejectByDeliveryBoy'
                          ? 'text-gray-600'
                          : 'text-green-600'
                    }`}>
                    {order.orderStatus}
                  </td> */}

                  {activeTab === "rejected" && (
                    <td className="px-4 py-3">
                      <button
                        onClick={() => navigate("/map", { state: { orderId: order._id } })}
                        className="text-[10px] whitespace-nowrap text-white bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded"
                      >
                        Assign To Other
                      </button>

                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveryData;

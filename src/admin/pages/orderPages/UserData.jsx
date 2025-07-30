import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetTotalAmountBalanceQuery, useGetUserOrdersQuery } from '../../redux/appSlice';
import { useSelector } from 'react-redux';

const OrdersFormView = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { data: orders = [], isLoading, error: isError } = useGetUserOrdersQuery(user?._id);
  const [activeTab, setActiveTab] = useState(0);

  const filteredOrder = orders.find((order) => order._id === id);
  const SingleuserId = filteredOrder?.userId?._id;


  const { data: totalAmount = [] } = useGetTotalAmountBalanceQuery(SingleuserId, {
    skip: !SingleuserId, 
  });

  if (isLoading) return <p className="p-4 text-gray-500">Loading orders...</p>;
  if (isError || !orders) return <p className="p-4 text-red-500">Failed to load orders.</p>;
  if (!filteredOrder) return <p className="p-4 text-gray-500">Order not found.</p>;

  
  const validServices = filteredOrder.services.filter(
    (service) => Array.isArray(service.products) && service.products.length > 0
  );

  return (
    <div className="p-4 overflow-y-hidden h-[85vh]">
      <div className="bg-white rounded-2xl shadow-md mb-8 p-6">
        {/* User Info */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <Input label="Name" value={filteredOrder.addressId?.name} />
          <Input label="Contact No" value={filteredOrder.userId?.contactNo} />
          <Input label="Email" value={filteredOrder.addressId?.email} />
          <Input label="Address" value={filteredOrder.addressId?.location} />
          <Input label="Order Date" value={filteredOrder.pickupDateTime} />
          <Input
            label="Total Amount"
            value={filteredOrder.totalAmount}
            textClass="text-green-500"
          />
          <Input label="Payment Method" value="Cash On Delivery" />
          <Input
            label="Wallet Balance"
            value={totalAmount?.totalBalanceAmount || 'N/A'}
          />
        </div>

        {/* Service Tabs */}
        {validServices.length > 0 && (
          <>
            <h2 className="px-4 py-2 text-xl font-medium">Service Type</h2>
            <div className="flex gap-4 border-b mb-6 px-4">
              {validServices.map((service, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`
                    relative pb-2 text-[18px] font-semibold transition
                    ${activeTab === idx ? 'text-black' : 'text-gray-400'}
                  `}
                >
                  {service?.serviceId?.name || '*No Service Name*'}
                  <span
                    className={`
                      absolute left-0 bottom-0 h-[2px] bg-black transition-all duration-300
                      ${activeTab === idx ? 'w-full' : 'w-0 hover:w-full'}
                    `}
                  />
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 cursor-pointer">
              {validServices[activeTab].products.map((prod, i) => (
                <ServiceBox
                  key={i}
                  label={prod.productName}
                  quantity={prod.quantity}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Input Component
const Input = ({ label, value, textClass = '' }) => (
  <div>
    <label className="block text-gray-500 mb-1">{label}</label>
    <input
      type="text"
      value={value || ''}
      readOnly
      className={`w-full bg-[#f9f4f3] p-4 rounded-md ${textClass}`}
    />
  </div>
);

// ServiceBox Component
const ServiceBox = ({ label, quantity, image }) => (
  <div className="bg-[#f9f4f3] p-6 rounded-xl flex flex-col items-center gap-3">
    {image && <img className="h-12" src={image} alt={label} />}
    <p className="text-lg font-semibold">{label}</p>
    <p className="text-md">Quantity: {quantity}</p>
  </div>
);

export default OrdersFormView;

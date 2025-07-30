import React from 'react';
import { FaCreditCard } from "react-icons/fa6";
import AnimatedNumber from "react-animated-numbers";
import { useGetUserOrdersQuery } from '../redux/appSlice';
import ShimmerUiForRevenue from '../../ShimmerUis/ShimmerUiForRevenue ';
import { useSelector } from 'react-redux';

const Revenue = () => {
  const { user } = useSelector((state) => state.auth);
  const { data = [], isLoading, error } = useGetUserOrdersQuery(user?._id);
  console.log("alldasta", data);

 
  const totalRevenue = data?.reduce((sum, item) => sum + (item.totalAmount || 0), 0);

  if (isLoading) {
    return <ShimmerUiForRevenue />;
  }

  return (
    <div className='w-[100vw] md:w-full bg-gray-100 xl:p-3 sm:p-8 p-4 cursor-pointer'>
      <div className='bg-white px-5 py-5 sm:px-4 sm:py-4 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 '>
        <div className='bg-[#6AD2FF45] h-[100px] w-[120px] sm:h-[130px] sm:w-[140px] rounded-2xl py-6 px-8 sm:py-8 sm:px-10 flex justify-center items-center'>
          <FaCreditCard className='text-5xl sm:text-6xl text-[#019ECE]' />
        </div>
        <div className='space-y-1 sm:space-y-2 text-center sm:text-left'>
          <h2 className='text-xl sm:text-2xl font-bold'>Total Revenue</h2>
          <div className='text-xl sm:text-2xl text-blue-600 flex items-center gap-1'>
            Rs.
            <AnimatedNumber
              animateToNumber={totalRevenue || 0}
              locale="en-IN"
              includeComma
              configs={() => ({ mass: 1, tension: 220, friction: 30 })}
            />
            /-
          </div>
        </div>
      </div>

      <h3 className='text-xl sm:text-2xl font-semibold py-5 sm:py-7 text-center sm:text-left'>All Transactions</h3>
      <div className='bg-white rounded-2xl shadow-sm max-h-[45vh] overflow-y-auto'>
        <table className='w-full text-left border-collapse min-w-[800px] cursor-pointer '>
          <thead className="bg-white z-10 text-sm sm:text-base font-medium text-gray-600 border-b">
            <tr>
              <th className='p-4 whitespace-nowrap'>Customer Name</th>
              <th className='p-4 whitespace-nowrap'>Contact No</th>
              <th className='p-4 whitespace-nowrap'>Email</th>
              <th className='p-4 whitespace-nowrap'>Service Type</th>
              <th className='p-4 whitespace-nowrap'>Amount</th>
              <th className='p-4 whitespace-nowrap'>Status</th>
            </tr>
          </thead>
          <tbody className='text-base sm:text-sm text-gray-600'>
            {data && data.map((res, index) => (
              <tr key={index} className='border-b'>
                <td className='p-4 whitespace-nowrap'>{res?.addressId?.name || "N/A"}</td>
                <td className='p-4 whitespace-nowrap'>{res?.addressId?.contactNo || "N/A"}</td>
                <td className='p-4 whitespace-nowrap'>{res?.addressId?.email || "N/A"}</td>
                <td className='p-4 whitespace-nowrap capitalize'>{res?.serviceType || "N/A"}</td>
                <td className='p-4 whitespace-nowrap text-green-500'>+{res?.totalAmount}/-</td>
                <td
                  className={`p-4 whitespace-nowrap font-medium ${res?.orderStatus === "completed"
                      ? "text-green-500"
                      : res?.orderStatus === "failed"
                        ? "text-red-500"
                        : "text-blue-500"
                    }`}
                >
                  {res?.orderStatus || "N/A"}
                </td>
              </tr>
            ))}
            {!data?.length && (
              <tr>
                <td colSpan="6" className='p-4 text-center text-gray-400'>No transactions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Revenue;

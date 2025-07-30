import React from 'react';

const ShimmerUiForRevenue = () => {
  const shimmerRow = Array(4).fill(null);

  return (
    <div className='w-full bg-gray-100 xl:p-3 sm:p-8 p-4'>

      <div className='bg-white px-5 py-5 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 animate-pulse'>
        <div className='bg-gray-200 h-[100px] w-[120px] sm:h-[130px] sm:w-[140px] rounded-2xl' />
        <div className='space-y-3 w-full'>
          <div className='h-6 w-1/3 bg-gray-200 rounded'></div>
          <div className='h-6 w-1/4 bg-gray-200 rounded'></div>
        </div>
      </div>


      <div className='mt-6 h-6 w-48 bg-gray-200 rounded animate-pulse'></div>


      <div className='bg-white mt-6 rounded-2xl shadow-sm overflow-x-auto animate-pulse'>
        <table className='w-full text-left border-collapse min-w-[800px]'>
          <thead>
            <tr className='text-sm text-gray-400'>
              {['Customer Name', 'Contact No', 'Email', 'Service Type', 'Amount', 'Status'].map((header, idx) => (
                <th key={idx} className='p-4 whitespace-nowrap'>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shimmerRow.map((_, index) => (
              <tr key={index} className='border-b'>
                {[...Array(6)].map((_, colIndex) => (
                  <td key={colIndex} className='p-4'>
                    <div className='h-4 w-full bg-gray-200 rounded'></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShimmerUiForRevenue;

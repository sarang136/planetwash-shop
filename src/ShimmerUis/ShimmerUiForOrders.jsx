

const ShimmerUiForOrders = () => {
  const rows = Array(7).fill(0);

  return (
    <div className='p-4 w-[100vw] md:w-[unset]'>
      <div className="md:w-full  bg-white rounded-xl shadow overflow-y-scroll">
      <table className="md:w-full text-sm animate-pulse">
        <thead>
          <tr>
            {Array(7).fill(0).map((_, index) => (
              <th key={index} className="p-4">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((_, rowIndex) => (
            <tr key={rowIndex} className="border-t border-gray-200">
              {Array(7).fill(0).map((_, colIndex) => (
                <td key={colIndex} className="p-4">
                  <div className="relative overflow-hidden bg-gray-200 rounded h-4 w-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                  </div>
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

export default ShimmerUiForOrders;

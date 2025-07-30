const ShimmerUiForDashboard = () => {
  return (
    <div className="p-6 space-y-6 animate-pulse">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="h-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl shadow-sm bg-[length:200%_100%] bg-[position:100%_0] animate-[shimmer_1.5s_infinite]"
          ></div>
        ))}
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="h-56 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl shadow-sm bg-[length:200%_100%] bg-[position:100%_0] animate-[shimmer_1.5s_infinite]"
          ></div>
        ))}
      </div>


      <div className="space-y-3">
        <div className="h-6 w-40 bg-gray-300 rounded"></div>
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          {/* Table header */}
          <div className="grid grid-cols-6 gap-2 p-4 bg-gray-100">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-300 rounded w-full"></div>
            ))}
          </div>

          {[...Array(3)].map((_, row) => (
            <div key={row} className="grid grid-cols-6 gap-2 p-4 border-t border-gray-200">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-2 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          ))}
        </div>
      </div>


      <style>
        {`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ShimmerUiForDashboard;

import React from 'react';

const ShimmerUiDelivery = () => {
  return (
    <div className="p-4 space-y-6 animate-pulse">
      {/* Profile Card Shimmer */}
      <div className="flex items-center gap-4 bg-white shadow rounded-lg p-4 w-fit border border-gray-200">
        <div className="w-16 h-16 bg-gray-200 rounded-full" />
        <div className="space-y-2">
          <div className="w-32 h-4 bg-gray-200 rounded" />
          <div className="w-40 h-4 bg-gray-200 rounded" />
          <div className="w-48 h-4 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Tab Shimmer */}
      <div className="flex gap-6 border-b border-gray-300">
        {[1, 2, 3, 4].map((_, i) => (
          <div key={i} className="h-6 w-36 bg-gray-200 rounded"></div>
        ))}
      </div>

      {/* Table Header Shimmer */}
      <div className="overflow-x-auto">
        <div className="w-full bg-white shadow rounded-lg">
          <div className="grid grid-cols-6 gap-4 px-4 py-3 border-b">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
          </div>

          {/* Table Rows Shimmer */}
          {[1, 2].map((_, rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-6 gap-4 px-4 py-4 border-b">
              {[1, 2, 3, 4, 5, 6].map((_, colIdx) => (
                <div
                  key={colIdx}
                  className="h-4 bg-gray-200 rounded w-full"
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShimmerUiDelivery;

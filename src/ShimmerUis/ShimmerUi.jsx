import React from "react";
import { useGetAllServicesQuery } from "../admin/redux/appSlice";

const ShimmerUi = ({length}) => {

  const shimmerCount = length


  // if (!isLoading) {

  //   return null;
  // }

  return (
    <div className="py-4 px-4 flex gap-6 flex-wrap justify-center">
      {/* {[...Array(shimmerCount)].map((_, index) => ( */}
      {Array.from({length:length}).map((_, index) => (
        <div
          key={index}
          className="relative w-[200px] h-[200px] bg-gray-200 rounded-lg overflow-hidden"
        >
          <div
            className="absolute inset-0 animate-shimmer"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)",
              transform: "translateX(-100%)",
              animation: "shimmer 1.5s infinite",
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default ShimmerUi;

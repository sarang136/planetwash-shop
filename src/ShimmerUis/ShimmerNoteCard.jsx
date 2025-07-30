import React from 'react';

const ShimmerNoteCard = () => {
  return (
    <div className="animate-pulse w-[300px] h-[120px] bg-gray-200 rounded-lg shadow p-4 flex flex-col justify-between">
      {/* Title Line */}
      <div className="h-5 bg-gray-300 rounded w-2/3 mb-2"></div>

      {/* Description Line */}
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>

      {/* Trash Icon Placeholder */}
      <div className="h-4 bg-gray-300 rounded w-5 self-end"></div>
    </div>
  );
};

export default ShimmerNoteCard;

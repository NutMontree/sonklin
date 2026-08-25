import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-[70vh] w-full flex-1">
      <div className="animate-spin rounded-full h-20 w-20 border-4 border-t-orange-500 border-gray-200"></div>
    </div>
  );
};

export default Loading;

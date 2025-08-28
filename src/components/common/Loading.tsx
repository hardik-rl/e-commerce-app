import React from "react";

const Loading = ({ message = "Loading..." }: { message?: string }) => (
  <div className="col-span-full text-center py-8 flex flex-col items-center">
    <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin mb-4"></div>
    <p>{message}</p>
  </div>
);

export default Loading;
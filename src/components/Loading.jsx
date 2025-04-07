import React from 'react';

function Loading() {
  return (
    <div className="flex  w-full justify-center items-center h-screen bg-gray-100">
      <div className="w-12 h-12 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;
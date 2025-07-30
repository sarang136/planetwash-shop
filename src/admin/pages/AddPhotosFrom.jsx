import React from 'react';
import { IoCloudUploadOutline } from "react-icons/io5";

const AddPhotosFrom = ({ closeForm }) => {
  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center font-dm'>
      <div className='bg-white rounded-3xl p-12 w-[400px] h-[450px] overflow-auto relative'>

        {/* X Close Button */}
        <button
          className='absolute top-2 right-4 text-xl font-bold text-gray-600 hover:text-red-500'
          onClick={closeForm}
        >
          ✕
        </button>

        {/* Modal Content */}
        <div className='text-center'>
          <div className="relative w-full">
            {/* Hidden file input */}
            <input
              type="file"
              id="file-upload"
              className="hidden" // Hide the default input
            />
            
            {/* Custom styled label that triggers the file input */}
            <label 
              htmlFor="file-upload"
              className="h-[250px] bg-gray-200 w-full rounded-3xl flex flex-col justify-center items-center cursor-pointer border-gray-400 hover:border-gray-600 transition-colors"
            >
              <IoCloudUploadOutline className="text-3xl text-gray-400 mb-2" />
              <span className="text-gray-400">Upload Photo</span>
            </label>
          </div>
          <button className='bg-[#052344] rounded-xl text-white mt-10 w-[160px] h-[52px]'>Add Photo</button>
        </div>

      </div>
    </div>
  );
};

export default AddPhotosFrom;
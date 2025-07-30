import React from "react";

const AddProduct = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add Product</h2>
            <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Device Category */}
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium">Device Category</label>
                        <input type="text" className="border p-2 rounded-md focus:outline-blue-500" placeholder="Enter category" />
                    </div>

                    {/* Device Brand */}
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium">Device Brand</label>
                        <input type="text" className="border p-2 rounded-md focus:outline-blue-500" placeholder="Enter model name" />
                    </div>

                    {/* Model Name */}
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium">Model Name</label>
                        <input type="text" className="border p-2 rounded-md focus:outline-blue-500" placeholder="Enter brand name" />
                    </div>

                    {/* Color */}
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium">Color</label>
                        <input type="text" className="border p-2 rounded-md focus:outline-blue-500" placeholder="Enter color" />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium">Description</label>
                        <textarea className="border p-2 rounded-md focus:outline-blue-500" rows="5" placeholder="Enter product description"></textarea>
                    </div>

                    {/* Price & Quantity */}
                    <div>
                        <div className="flex flex-col">
                            <label className="text-gray-600 font-medium">Price</label>
                            <input type="number" className="border p-2 rounded-md focus:outline-blue-500" placeholder="Enter price" />
                        </div>

                        <div className="flex flex-col mt-4">
                            <label className="text-gray-600 font-medium">Quantity</label>
                            <input type="number" className="border p-2 rounded-md focus:outline-blue-500" placeholder="Enter quantity" />
                        </div>
                    </div>

                    {/* Upload Photos */}
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium">Upload Photos</label>
                        <input type="file" className="border p-2 rounded-md" multiple />
                    </div>
                </div>

                <div className="flex justify-end mt-2 md:mt-0 md:me-36">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;

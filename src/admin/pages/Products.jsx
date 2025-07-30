import React from 'react'
import { FaEdit, FaFilter, FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const products = [
    {
        id: 1,
        model: "iPhone 14",
        category: "Smartphone",
        brand: "Apple",
        color: "Black",
        price: "$999",
        status: "Sold",
        image: "https://rukminim2.flixcart.com/image/832/832/ktketu80/mobile/z/h/v/iphone-13-pro-mlvq3hn-a-apple-original-imag6vpc6mx3zwhz.jpeg?q=70&crop=false",
    },
    {
        id: 2,
        model: "Galaxy S23",
        category: "Smartphone",
        brand: "Samsung",
        color: "Blue",
        price: "$899",
        status: "Not Sold",
        image: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/q/k/h/-original-imagzm8qmr7qxfhq.jpeg?q=70&crop=false",
    },
    {
        id: 3,
        model: "iPhone 14",
        category: "Smartphone",
        brand: "Apple",
        color: "Black",
        price: "$999",
        status: "Sold",
        image: "https://rukminim2.flixcart.com/image/832/832/ktketu80/mobile/z/h/v/iphone-13-pro-mlvq3hn-a-apple-original-imag6vpc6mx3zwhz.jpeg?q=70&crop=false",
    },
    {
        id: 4,
        model: "Galaxy S23",
        category: "Smartphone",
        brand: "Samsung",
        color: "Blue",
        price: "$899",
        status: "Not Sold",
        image: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/q/k/h/-original-imagzm8qmr7qxfhq.jpeg?q=70&crop=false",
    },
];

const Products = () => {
    return (
        <div className="overflow-x-auto bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Product List</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b  text-gray-500 ">
                        <th className="p-3 text-left font-medium">Product</th>
                        <th className="p-3 text-left font-medium" >Category</th>
                        <th className="p-3 text-left font-medium">Brand</th>
                        <th className="p-3 text-left font-medium">Color</th>
                        <th className="p-3 text-left font-medium">Price</th>
                        <th className="p-3 text-left font-medium">Status</th>
                        <th className="p-3 text-center font-medium">
                            <div className="flex items-center justify-center gap-2 border p-1 rounded-md">
                                <span>Filter</span>

                                {/* DaisyUI Dropdown */}
                                <div className="dropdown dropdown-end">
                                    <button tabIndex={0} className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center">
                                        <FaFilter className="text-gray-600" />
                                    </button>
                                    <ul tabIndex={0} className="dropdown-content z-[100] shadow bg-white border rounded-md w-40">
                                        <li>
                                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Last 7 Days</button>
                                        </li>
                                        <li>
                                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Yesterday</button>
                                        </li>
                                        <li>
                                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">This Month</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </th>


                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">
                                <div className="flex items-center gap-3">
                                    {/* Image Div */}
                                    <Link to={`/product/${product.id}`} className="text-blue-500 hover:text-blue-700">
                                        <div className="w-14 h-14    flex items-center justify-center border border-gray-200 rounded-xl">
                                            <img src={product.image} alt={product.model} className="w-11 h-11 object-contain rounded" />
                                        </div>
                                    </Link>

                                    <div className="font-medium text-gray-700">
                                        {product.model}
                                    </div>
                                </div>
                            </td>

                            <td className="p-3">{product.category}</td>
                            <td className="p-3">{product.brand}</td>
                            <td className="p-3">{product.color}</td>
                            <td className="p-3 font-semibold">{product.price}</td>
                            <td className={`p-3 ${product.status === "Sold" ? "text-green-600" : "text-red-600"}`}>{product.status}</td>
                            <td className="p-3 text-center ">
                                <div className="flex items-center justify-center gap-4">
                                    <button className="text-blue-500 hover:text-blue-700">
                                        <FaEdit />
                                    </button>
                                    <button className="text-red-500 hover:text-red-700">
                                        <FaTrash />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Products
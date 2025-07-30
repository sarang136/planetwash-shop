import React, { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';

const products = [
    {
        id: 1,
        model: "iPhone 14",
        category: "Smartphone",
        brand: "Apple",
        color: "Black",
        price: "$999",
        status: "Sold",
        images: [
            "https://rukminim2.flixcart.com/image/832/832/ktketu80/mobile/z/h/v/iphone-13-pro-mlvq3hn-a-apple-original-imag6vpc6mx3zwhz.jpeg?q=70&crop=false",
            "https://m.media-amazon.com/images/I/61+0gHhq1rL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/71ta3jyFvIL._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/61PaO55e2GL._SL1500_.jpg"
        ]
    },
    {
        id: 2,
        model: "Galaxy S23",
        category: "Smartphone",
        brand: "Samsung",
        color: "Blue",
        price: "$899",
        status: "Not Sold",
        images: [
            "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/q/k/h/-original-imagzm8qmr7qxfhq.jpeg?q=70&crop=false",
            "https://m.media-amazon.com/images/I/71Mgmay88QL._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/81ZPsNFlRsL._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71Mgmay88QL._SL1500_.jpg"
        ]

    },
]

const ProductDetails = () => {
    const { id } = useParams();
    const product = products.find((p) => p.id === parseInt(id));
    console.log(product);

    const [selectedImage, setSelectedImage] = useState(product?.images[0] || "https://m.media-amazon.com/images/I/71iRY9pUoVL._SX679_.jpg");
    if (!product) {
        return <div className="text-center text-2xl text-red-500">Product Not Found</div>;
    }
    return (
        <div>
            <div className="mx-auto p-6 bg-white shadow-lg rounded-lg ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
                    {/* Image Section */}
                    <div className=''>
                        <div className="relative">
                            {/*Overlay */}
                            <div className="border p-2 rounded-lg shadow-md relative">
                                <img src={selectedImage} alt="Product" className="w-full h-80 object-contain rounded-lg" />

                                {/* SOLD OUT Overlay */}
                                {product.status === "Sold" && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                                        <span className="text-white text-4xl">Sold Out</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Thumbnails */}
                        <div className="flex gap-3 mt-4 justify-center ">
                            {product.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt="Thumbnail"
                                    className={`w-16 h-16 object-contain border-2 rounded-lg cursor-pointer 
                                ${selectedImage === img ? "border-blue-500" : "border-gray-300"}`}
                                    onClick={() => setSelectedImage(img)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="space-y-3 ">
                        <h2 className="text-2xl font-bold">{product.model}</h2>
                        <p className="text-gray-600">{product.category}</p>
                        <p className="text-gray-700 font-medium">Brand: {product.brand}</p>
                        <p className="text-gray-700 font-medium">Color: {product.color}</p>
                        <p className="text-lg font-semibold">Price: {product.price}</p>
                        <p className={`mt-2 font-semibold ${product.status === "Sold" ? "text-green-600" : "text-red-600"}`}>
                            Status: {product.status}
                        </p>

                    </div>
                </div>
                <div className="flex items-cente justify-end gap-4">
                    <button className=" px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                        Add More
                    </button>
                    <button className="text-blue-500 hover:text-blue-700">
                        <FaEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                        <FaTrash />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
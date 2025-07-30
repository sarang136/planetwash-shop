import React, { useState } from 'react';
import {
  useGetProductByServiceQuery,
  useDeleteProductByIdMutation,
  useUpdateProductByIdMutation,
  useAddProductForSubCategoryMutation,
  useDeleteProductBySubcategoryMutation,
} from '../redux/appSlice';
import { MdDelete, MdEdit, MdLocalLaundryService, MdOutlineErrorOutline } from 'react-icons/md';
import toast from 'react-hot-toast';
import { GiWashingMachine } from 'react-icons/gi';
import { PiWashingMachineBold } from 'react-icons/pi';

const ServicesData = ({ serviceId }) => {
  const {
    data: serviceData,
    isLoading,
    error,
    refetch,
  } = useGetProductByServiceQuery(serviceId, {
    skip: !serviceId,
  });

  console.log(serviceData)

  const [deleteProductById] = useDeleteProductByIdMutation();
  const [updateProductById, { isLoading: isUpdating }] = useUpdateProductByIdMutation();
  const [addProduct, { isLoading: isAdding }] = useAddProductForSubCategoryMutation();
  const [deleteProductsBySubCat] = useDeleteProductBySubcategoryMutation();
  

  const [addingSubId, setAddingSubId] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', image: '', subcategoryName: '' });

  const [viewAllModalOpen, setViewAllModalOpen] = useState(false);
  const [viewAllProducts, setViewAllProducts] = useState([]);
  const [viewSubcategoryName, setViewSubcategoryName] = useState('');

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: null });
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('');

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      await deleteProductById(id).unwrap();
      toast.success("Product deleted successfully");
      setViewAllModalOpen(false);
    } catch (err) {
      console.error("Failed to delete product:", err);
      toast.error("Failed to delete the product");
    }
  };

  const deleteBySubcat = async (subcategoryId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete all products in this subcategory?");
  if (!confirmDelete) return;

  try {
    await deleteProductsBySubCat(subcategoryId).unwrap();
    toast.success("Product Deleted Successfully");
    setViewAllModalOpen(false);
    refetch(); // Optional: refetch data after deletion
  } catch (err) {
    toast.error("Failed to delete products in subcategory");
    console.error("Delete subcategory error:", err);
  }
};

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      subcategoryName: product.subcategoryName,
    });
    setEditModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await updateProductById({
        productId: editingProduct._id,
        body: formData,
      }).unwrap();
      toast.success("Product updated successfully.");
      setEditModalOpen(false);
      setViewAllModalOpen(false);
      refetch();
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update product.");
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert("Please fill all fields");
      return;
    }

    try {
      setAddingSubId(selectedSubcategoryId);

      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('price', newProduct.price);
      formData.append('image', newProduct.image);
      formData.append('subcategoryId', selectedSubcategoryId);

      await addProduct(formData).unwrap();

      toast.success("Product added successfully.");
      setAddModalOpen(false);
      setNewProduct({ name: '', price: '', image: null });
      refetch();
    } catch (error) {

      alert(error.data.error);
    } finally {
      setAddingSubId('');
    }
  };


  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === 'file') {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  const handleNewProductChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setNewProduct({ ...newProduct, image: files[0] });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  if (!serviceId) return <div>No service selected</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className='italic bg-white p-4 rounded-2xl shadow-md font-medium text-gray-400'>Oops... No Products on this Service!</div>;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-[rgba(235,235,235,1)]">
            <tr>
              <th className="p-4 text-left text-sm font-bold text-gray-900">Subcategory</th>
              <th className="p-4 text-left text-sm font-bold text-gray-900">Products</th>
              <th className="p-4 text-left text-sm font-bold text-gray-900">Total Price</th>
              <th className="p-4 text-left text-sm font-bold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {serviceData?.product?.subcategories?.length > 0 ? (
              serviceData.product.subcategories.map((subcategory) => {
                const firstProduct = subcategory.products[0];
                return (
                  <tr key={subcategory._id}>
                    <td className="p-4">
                      {subcategory.name}
                      <span className="text-sm italic text-gray-400">

                      </span>
                      <button
                        className='px-2 ml-2 rounded-full bg-gray-200 hover:bg-[#8EDF4C] hover:text-white transition'
                        onClick={() => {
                          setSelectedSubcategoryId(subcategory._id);
                          setAddModalOpen(true);
                        }}
                      >
                        +
                      </button>
                    </td>
                    <td className="p-4 flex items-center gap-2 justify-between border-l">
                      <span>{subcategory.products.length} items</span>
                      <button
                        onClick={() => {
                          setViewAllProducts(subcategory.products);
                          setViewSubcategoryName(subcategory.name);
                          setViewAllModalOpen(true);
                        }}
                        className="text-black text-xs border px-2 rounded-lg transition bg-gray-100 hover:bg-[#8EDF4C] hover:text-white"
                      >
                        View All
                      </button>
                    </td>
                    <td className="p-4 border-l">
                      Rs. {subcategory.products.reduce((total, product) => total + Number(product.price || 0), 0)}
                    </td>
                    <td className="p-4  hover:text-red-800"
                      onClick={() => deleteBySubcat(subcategory._id)}
                    >
                      <MdDelete />
                    </td>

                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3" className="text-center  text-gray-500 py-4">
                  No products found
                </td>
                <td className="p-4  hover:text-red-800">
                  {/* <MdDelete /> */}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {addModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96 shadow-lg space-y-4">
            <h2 className="text-lg font-semibold">Add Product</h2>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleNewProductChange}
              placeholder="Product Name"
              className="w-full border p-2 rounded"
            />
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleNewProductChange}
              placeholder="Price"
              className="w-full border p-2 rounded"
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleNewProductChange}
              className="w-full border p-2 rounded"
            />
            <div className="flex justify-end gap-4 pt-2">
              <button
                onClick={() => setAddModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                disabled={isAdding}
                className={`px-4 py-2 rounded text-white ${isAdding ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                  }`}
              >
                {isAdding ? 'Adding...' : 'Add'}
              </button>

            </div>
          </div>
        </div>
      )}

      {/* View All Modal */}
      {viewAllModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] max-w-lg max-h-[70vh] p-6 rounded-xl overflow-y-auto shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">All Products</h2>
                <p className="text-sm text-gray-500">
                  Subcategory: <span className="font-medium text-gray-700">{viewSubcategoryName}</span>
                </p>
              </div>
              <button
                onClick={() => setViewAllModalOpen(false)}
                className="text-red-500 text-2xl font-bold hover:text-red-700"
              >
                ×
              </button>
            </div>
            {viewAllProducts.length > 0 ? (
              <ul className="space-y-4">
                {viewAllProducts.map((product, index) => (
                  <li
                    key={product._id}
                    className="bg-gray-50 p-4 rounded-md shadow-sm border flex justify-between items-start"
                  >
                    <div>
                      <p className="font-medium text-gray-900 p-2">
                        {index + 1}. {product.name}
                      </p>
                      <img className='h-[100px] w-[150px] p- rounded-lg' src={product.image} />
                      <p className="text-sm text-blackm font-bold p-2">Price: {product.price} Rs</p>
                    </div>
                    <div className="flex gap-3 pt-1">
                      <button onClick={() => handleEditClick(product)}>
                        <MdEdit className="text-blue-500 text-xl hover:text-blue-700" />
                      </button>
                      <button onClick={() => handleDelete(product._id)}>
                        <MdDelete className="text-red-500 text-xl hover:text-red-700" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm italic">No products available.</p>
            )}
          </div>
        </div>
      )}


      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96 shadow-lg space-y-4">
            <h2 className="text-lg font-semibold">Edit Product</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full border p-2 rounded"
            />
            {/* <input
              type="text"
              name="subcategoryName"
              value={formData.subcategoryName}
              onChange={handleChange}
              placeholder="Sub Product Name"
              className="w-full border p-2 rounded"
            /> */}
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border p-2 rounded"
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <div className="flex justify-end gap-4 pt-2">
              <button onClick={() => setEditModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className={`px-4 py-2 rounded text-white ${isUpdating ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isUpdating ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServicesData;

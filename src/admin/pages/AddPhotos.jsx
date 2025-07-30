import React, { useState } from 'react';
import {
  useGetImagesDetailsQuery,
  useDeleteImageByIdMutation,
  usePostImagesMutation,
} from '../redux/appSlice';
import { MdDeleteOutline } from 'react-icons/md';
import { FiUploadCloud } from 'react-icons/fi';
import ShimmerUi from '../../ShimmerUis/ShimmerUi';
import { useSelector } from 'react-redux';

const AddPhotos = () => {
  const { user } = useSelector((state) => state.auth);

  const { data, refetch, isLoading } = useGetImagesDetailsQuery(user._id);
  const [deleteShopById, { isLoading: isDeleting }] = useDeleteImageByIdMutation();
  const [postImages, { isLoading: isUploading }] = usePostImagesMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleDelete = async (_id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this image?');
    if (!confirmDelete) return;

    try {
      await deleteShopById(_id).unwrap();
      refetch();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert('Please select an image');

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('shopId', user._id);

      await postImages(formData).unwrap();

      setIsModalOpen(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      refetch();
    } catch (error) {
      console.error('Upload error:', error);
      alert('Image upload failed');
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (isLoading) {
    return <ShimmerUi length={10} />;
  }

  return (
    <div className="px-4 py-6">
      <div className="flex justify-wrap flex-wrap gap-10 max-h-[70vh] overflow-y-scroll">
        {data?.data?.length === 0 ? (
          <p className="text-gray-500 italic text-center w-full">No Images Found</p>
        ) : (
          data?.data?.map((res, index) => (
            <div
              key={index}
              className="h-[200px] w-[230px] overflow-hidden relative border rounded-2xl shadow-md"
            >
              <img
                src={res.image}
                alt={`Image ${index}`}
                onClick={() => setSelectedImage(res.image)}
                className="h-full w-full object-cover rounded-2xl cursor-pointer"
              />
              <button
                onClick={() => handleDelete(res._id)}
                disabled={isDeleting}
                className="absolute bottom-3 right-3 bg-white text-black p-2 rounded-full shadow-lg hover:bg-red-100 transition"
              >
                <MdDeleteOutline size={20} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-end">
        <button
          className="bg-blue-400 px-4 py-2 rounded-lg mt-6"
          onClick={() => setIsModalOpen(true)}
        >
          Add Photos
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 w-[350px] max-w-full shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-center">Upload Photo</h2>

            <label className="w-full h-40 flex flex-col justify-center items-center bg-gray-100 rounded-xl cursor-pointer border border-dashed border-gray-400 hover:border-gray-600 transition relative overflow-hidden">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <>
                  <FiUploadCloud className="w-10 h-10 text-gray-400 mb-2" />
                  <span className="text-gray-400">Click to upload</span>
                </>
              )}
            </label>

            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={handleUpload}
                className="btn bg-lime-500 text-white hover:bg-lime-600"
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Add Photo'}
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
                className="btn btn-ghost"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Selected"
              className="max-h-[80vh] max-w-[80vw] rounded-lg"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full w-10 h-10 flex items-center justify-center text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPhotos;

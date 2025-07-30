import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  useGetOffersbyShopidQuery,
  useGetRejectedOffersByShopIdQuery,
  useGetPendingOffersByShopIdQuery,
  useDeleteOfferByIdMutation,
  useAddOffersOnShopMutation,
} from '../redux/appSlice';

import Loader from '../../ShimmerUis/Loader';
import { MdDelete } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import toast from 'react-hot-toast';

const Offers = () => {
  const [statusBtn, setStatusBtn] = useState('approved');
  const fileInputRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const [previewImage, setPreviewImage] = useState(null);

  const [deleteOfferById] = useDeleteOfferByIdMutation();
  const [addOffer, { isLoading: isAdding }] = useAddOffersOnShopMutation();

  const {
    data: approvedData,
    isLoading: loadingApproved,
    error: errorApproved,
  } = useGetOffersbyShopidQuery(user?._id);

  const {
    data: rejectedData,
    isLoading: loadingRejected,
    error: errorRejected,
  } = useGetRejectedOffersByShopIdQuery(user?._id);

  const {
    data: pendingData,
    isLoading: loadingPending,
    error: errorPending,
  } = useGetPendingOffersByShopIdQuery(user?._id);

  const approvedOffers = approvedData?.data || [];
  const rejectedOffers = rejectedData?.data || [];
  const pendingOffers = pendingData?.data || [];

  const handleDelete = async (offerId) => {
    const confirmed = window.confirm("Are you sure you want to delete this offer?");
    if (!confirmed) return;

    try {
      await deleteOfferById(offerId).unwrap();
      toast.success("Offer deleted successfully.");
    } catch (error) {
      const errorMessage =
        error?.data?.message || error?.error || "Something went wrong. Please try again.";
      alert(errorMessage);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('shopId', user._id);
    formData.append('image', file);

    try {
      await addOffer(formData).unwrap();
      toast.success('Offer added successfully!');
    } catch (error) {
      const errorMessage =
        error?.data?.message || error?.error || 'Something went wrong. Please try again.';
      alert(errorMessage);
    }
  };

  const triggerFilePicker = () => {
    fileInputRef.current.click();
  };

  const renderOffers = (offers) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {offers.map((offer, index) => (
        <div key={index} className="relative border p-2 rounded shadow">
          <img
            src={offer?.image}
            alt={`Offer ${index}`}
            className="w-full h-40 object-cover rounded cursor-pointer"
            onClick={() => setPreviewImage(offer?.image)}
          />
          <button
            onClick={() => handleDelete(offer._id)}
            className="absolute bottom-3 right-3 bg-white p-1 rounded-full shadow hover:bg-red-500 hover:text-white transition"
          >
            <MdDelete className="text-lg" />
          </button>
        </div>
      ))}
    </div>
  );

  const loading =
    (statusBtn === 'approved' && loadingApproved) ||
    (statusBtn === 'rejected' && loadingRejected) ||
    (statusBtn === 'pending' && loadingPending);

  const error =
    (statusBtn === 'approved' && errorApproved) ||
    (statusBtn === 'rejected' && errorRejected) ||
    (statusBtn === 'pending' && errorPending);

  const offersData =
    statusBtn === 'approved' ? approvedOffers :
    statusBtn === 'rejected' ? rejectedOffers :
    pendingOffers;

  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setStatusBtn('approved')}
          className={`px-4 py-2 rounded-lg ${statusBtn === 'approved' ? 'bg-[#8EDF4C] text-white' : ''}`}
        >
          Approved ({approvedOffers.length})
        </button>
        <button
          onClick={() => setStatusBtn('rejected')}
          className={`px-4 py-2 rounded-lg ${statusBtn === 'rejected' ? 'bg-[#8EDF4C] text-white' : ''}`}
        >
          Rejected ({rejectedOffers.length})
        </button>
        <button
          onClick={() => setStatusBtn('pending')}
          className={`px-4 py-2 rounded-lg ${statusBtn === 'pending' ? 'bg-[#8EDF4C] text-white' : ''}`}
        >
          Pending ({pendingOffers.length})
        </button>
      </div>

      {/* Loader */}
      {loading && <Loader />}

      {/* Error */}
      {error && (
        <p className="text-gray-500 text-center">No {statusBtn} Data Found</p>
      )}

      {/* Offer Grid or Empty */}
      {!loading && !error && (
        offersData.length > 0
          ? renderOffers(offersData)
          : <p className="text-gray-600 text-center">No Data {statusBtn} Found</p>
      )}

      {/* Upload Offer Button */}
      <div className="flex justify-end mt-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <button
          onClick={triggerFilePicker}
          className="border py-2 px-4 bg-yellow-300 rounded-lg hover:bg-yellow-400 transition"
        >
          {isAdding ? 'Uploading...' : 'Add Offer'}
        </button>
      </div>

      {/* Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative max-w-3xl w-full px-4">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 right-6 text-white text-3xl bg-black bg-opacity-50 p-1 rounded-full"
            >
              <IoMdClose />
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Offers;

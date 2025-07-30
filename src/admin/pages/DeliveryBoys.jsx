import { useState } from 'react';
import { HiTrash } from 'react-icons/hi';
import { BiUser } from 'react-icons/bi';
import {
  useGetAllDeliveryBoysQuery,
  useDeleteDeliveryBoysByIdMutation,
  useGetDeliveryBoyByIDQuery
} from '../redux/appSlice';
import DeliveryData from '../components/DeliveryData';
import { useSelector } from 'react-redux';
import ShimmerUiDelivery from '../../ShimmerUis/ShimmerUiDelivery';

const DeliveryBoys = () => {
  const { user } = useSelector((state) => state.auth);
      console.log("user", user)

  const { data: deliveryBoys, isLoading, isError } = useGetDeliveryBoyByIDQuery(user?._id);
  console.log("edijsjkm",deliveryBoys);
  const [deleteDeliveryBoy] = useDeleteDeliveryBoysByIdMutation();
  const [selectedBoyId, setSelectedBoyId] = useState(null);
  const [modalData, setModalData] = useState(null);

  const handleModalOpen = (boy) => {
    setModalData(boy);
  };

  const handleModalClose = () => {
    setModalData(null);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this delivery boy?");
    console.log("Deleting ID:", id);
    if (!confirm) return;

    try {
      await deleteDeliveryBoy(id).unwrap();
      console.log('Deleted successfully');
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete delivery boy.');
    }
  };

  if (isLoading) return <ShimmerUiDelivery />;

  if (isError) return <p className='text-center'>No Data Found</p>;

  if (!isLoading && deliveryBoys?.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No delivery boys data found.</p>;
  }

  const selectedBoy = deliveryBoys?.find(boy => boy._id === selectedBoyId);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {deliveryBoys?.map((boy) => (
          <div
            key={boy._id}
            className={`p-6 rounded-2xl bg-white cursor-pointer shadow-md flex gap-4 ${boy._id === selectedBoyId ? 'ring-2 ring-green-500' : ''}`}
          >
            <div className="flex items-center justify-center border-2 shadow rounded-2xl overflow-hidden">
              <img
                src={boy.DeliveryBoyProfileImg}
                alt="Delivery Boy"
                className="w-[70px] h-[70px]"
                onClick={() => setSelectedBoyId(boy._id === selectedBoyId ? null : boy._id)}
              />
            </div>
            <div className="flex-1 space-y-1">
              <p className="font-medium text-gray-900 text-lg">{boy.Name}</p>
              <p className="text-gray-600 text-sm">{boy.contactNo}</p>
              <p className="text-gray-600 text-sm break-words w-[150px]">{boy.email}</p>
            </div>
            <div className="flex flex-col justify-between gap-2">
              <button
                className="text-red-500"
                title="Delete"
                onClick={() => handleDelete(boy._id)}
              >
                <HiTrash size={20} />
              </button>
              <button
                className="text-blue-500"
                title="Details"
                onClick={() => handleModalOpen(boy)}
              >
                <BiUser size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedBoyId && (
        <div className="p-4 mt-6">
          <DeliveryData deliveryBoyId={selectedBoyId} shopDetails={selectedBoy?.shopId} />
        </div>
      )}

  
      {modalData && (
        <dialog id="delivery_modal" className="modal modal-open">
          <div className="modal-box w-4/12 scrollbar-hide">
            <h3 className="font-bold text-lg mb-3">Delivery Boy Details</h3>
            <div className="space-y-2">
              <p><strong>Name:</strong> <span className='text-gray-400 italic'>{modalData.Name}</span></p>
              <p><strong>Phone:</strong> <span className='text-gray-400 italic'>{modalData.contactNo}</span></p>
              <p><strong>Email:</strong> <span className='text-gray-400 italic'> {modalData.email}</span></p>
              <p><strong>Aadhar Number:</strong > <span className='text-gray-400 italic'>{modalData.AadharNO}</span></p>
              <p><strong>Driving License:</strong> <span className='text-gray-400 italic'>{modalData.DrivingLicence}</span></p>
              <p className='font-bold'>Adhar Image : <img className='h-[250px] w-full' src={modalData.AadharImage}/></p>
              <p className='font-bold'>Driving Licence Image : <img className='h-[250px] w-full' src={modalData.DrivingLicenceImage}/></p>
            </div>
            <div className="modal-action flex justify-center">
              <button className="btn" onClick={handleModalClose}>Close</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default DeliveryBoys;

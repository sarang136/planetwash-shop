import ShimmerUiForOrders from "../../../ShimmerUis/ShimmerUiForOrders";
import { useNavigate, useRevalidator } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserOrdersQuery } from "../../redux/appSlice";

const PickupSchedule = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: allOrders = [], isLoading, error } = useGetUserOrdersQuery(user?._id);
  const pickupOrders = allOrders.filter(order => order.orderStatus === "pickup");
  console.log(pickupOrders)
  const navigate = useNavigate();

  const isMobile = window.innerWidth < 768;

  if (isLoading) return <ShimmerUiForOrders />;
  if (error) return <p className="text-center  py-6">No Orders Found</p>;

  return (
    <div className="overflow-x-auto max-h-[75vh] overflow-y-auto px-4 bg-white rounded-2xl shadow">
      {pickupOrders.length === 0 ? (
        <p className="text-center text-gray-500 py-6">No Pickup-Scheduled Orders found</p>
      ) : (
        <table className="min-w-[1000px] w-full text-xs md:text-sm bg-white rounded-xl">
          <thead className=" sticky top-0 z-10 bg-white">
            <tr>
              <th className="p-6 text-left font-semibold">Name</th>
              <th className="p-3 text-left font-semibold">Contact</th>
              <th className="p-3 text-left font-semibold">Email</th>
              {/* <th className="p-3 text-left font-semibold">Service</th> */}
              {/* <th className="p-3 text-left font-semibold">Delivered By</th> */}
              <th className="p-3 text-left font-semibold">Address</th>
              <th className="p-3 text-left font-semibold">Payment</th>
              <th className="p-3 text-left font-semibold">Pickup Time</th>
              <th className="p-3 text-left font-semibold">Last Updated</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {pickupOrders.map((order, index) => {
              const {
                _id,
                addressId,
                deliveryBoyName,
                deliveryBoyContact,
                paymentMethod,
                updatedAt,
                services,
                pickupDateTime,
              } = order;

              return (
                <tr key={_id || index} className=" text-gray-400">
                  <td
                    className="p-3 cursor-pointer"
                    onClick={() =>
                      navigate(`/userData/${_id}`)
                    }
                  >
                    {addressId?.name || "N/A"}
                  </td>
                  <td className="p-3">{addressId?.contactNo || "N/A"}</td>
                  <td className="p-3">{addressId?.email || "N/A"}</td>
                  {/* <td className="p-3">{services?.[0]?.serviceId?.name || "N/A"}</td> */}
                  {/* <td className="p-3">{`${deliveryBoyName || "N/A"} (${deliveryBoyContact || "N/A"})`}</td> */}
                  <td className="p-3">
                    {addressId?.location}, {addressId?.pincode}
                  </td>
                  <td className="p-3 capitalize">{paymentMethod || "Cash on Delivery"}</td>
                  <td className="p-3">{pickupDateTime ? new Date(pickupDateTime).toLocaleString() : "N/A"}</td>
                  <td className="p-3">{updatedAt ? new Date(updatedAt).toLocaleString() : "N/A"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PickupSchedule;

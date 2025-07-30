import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useGetDeliveryBoyByIDQuery,
  useAssignDeliveryBoytoReturnMutation,
} from '../redux/appSlice';
import toast from 'react-hot-toast';

delete L.Icon.Default.prototype._getIconUrl;

const Map2 = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const mapRef = useRef(null);

  const shopLoc = location.state?.locs?.locations;
  const shopLat = Number(shopLoc?.latitude);
  const shopLng = Number(shopLoc?.longitude);
  const orderId = location.state?.orderId || null;

  const [assigningId, setAssigningId] = useState(null);
  const { data: boysLocation } = useGetDeliveryBoyByIDQuery(user._id);
  const [assignOrder, { isLoading }] = useAssignDeliveryBoytoReturnMutation();
  const markerRefs = useRef([]);

  const getValidLatLng = () => {
    if (!Array.isArray(boysLocation)) return null;
    for (let boy of boysLocation) {
      const lat = Number(boy?.locations?.latitude);
      const lng = Number(boy?.locations?.longitude);
      if (!isNaN(lat) && !isNaN(lng)) return [lat, lng];
    }
    return null;
  };

  const defaultCenter =
    !isNaN(shopLat) && !isNaN(shopLng) ? [shopLat, shopLng] : getValidLatLng();

  useEffect(() => {
    markerRefs.current.forEach((ref) => {
      if (ref) ref.openPopup();
    });

    if (mapRef.current && !isNaN(shopLat) && !isNaN(shopLng)) {
      setTimeout(() => {
        mapRef.current.flyTo([shopLat, shopLng], 16, {
          animate: true,
          duration: 2,
        });
      }, 500);
    }
  }, [boysLocation]);

  const handleAssign = async (deliveryBoyId) => {
    if (!orderId) return toast.error('Order ID missing.');
    if (!deliveryBoyId) return toast.error('Delivery Boy ID missing.');

    setAssigningId(deliveryBoyId);
    try {
      await assignOrder({
        id: orderId,
        deliveryBoyId: deliveryBoyId, // ✅ send this to avoid 500 error
      }).unwrap();

      toast.success('✅ Order assigned successfully!');
      navigate('/delivery-boys');
    } catch (err) {
      console.error('❌ Error assigning order:', err);
      toast.error('❌ Failed to assign order');
    } finally {
      setAssigningId(null);
    }
  };

  if (!defaultCenter) {
    return <p className="text-center mt-10 text-red-500">📍 Waiting for location data...</p>;
  }

  const shopIcon = L.divIcon({
    html: `
      <div style="text-align:center;">
        <div style="font-size: 35px;">🏪</div>
        <div style="margin-top:2px;font-size:12px;color:#111;font-weight:bold;background:white;padding:2px 4px;border-radius:4px;box-shadow:0 0 3px rgba(0,0,0,0.3);">Order Location</div>
      </div>
    `,
    className: '',
    iconSize: [60, 70],
    iconAnchor: [30, 70],
    popupAnchor: [0, -70],
  });

  return (
    <MapContainer
      center={defaultCenter}
      zoom={12}
      style={{ height: '85vh', width: '100%' }}
      whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {!isNaN(shopLat) && !isNaN(shopLng) && (
        <Marker position={[shopLat, shopLng]} icon={shopIcon}>
          <Popup>
            <div className="text-center">
              <p className="font-bold text-lg">Order Location</p>
              <p>Latitude: {shopLat}</p>
              <p>Longitude: {shopLng}</p>
            </div>
          </Popup>
        </Marker>
      )}

      {boysLocation?.map((boy, index) => {
        const lat = Number(boy?.locations?.latitude);
        const lng = Number(boy?.locations?.longitude);
        if (isNaN(lat) || isNaN(lng)) return null;

        const customIcon = L.divIcon({
          html: `
            <div style="text-align:center;">
              <img src="${boy?.DeliveryBoyProfileImg}" style="width:45px;height:45px;border-radius:50%;border:2px solid white;box-shadow:0 0 5px rgba(0,0,0,0.5);" />
              <div style="margin-top:4px;font-size:12px;color:#111;font-weight:bold;background:white;padding:2px 4px;border-radius:4px;box-shadow:0 0 3px rgba(0,0,0,0.3);">${boy?.Name}</div>
            </div>
          `,
          className: '',
          iconSize: [60, 70],
          iconAnchor: [30, 70],
          popupAnchor: [0, -70],
        });

        return (
          <Marker
            key={index}
            position={[lat, lng]}
            icon={customIcon}
            ref={(el) => (markerRefs.current[index] = el)}
          >
            <Popup>
              <div className="text-sm text-center">
                <div className="flex justify-start">
                  <img className="h-[70px]" src={boy?.DeliveryBoyProfileImg} alt="DP" />
                </div>
                <p className="font-bold text-xl text-left">Name: {boy?.Name}</p>
                <p className="text-left">Contact Number: {boy?.contactNo}</p>
                <p className="text-left">Email: {boy?.email}</p>
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
                    onClick={() => handleAssign(boy?._id)}
                    disabled={assigningId === boy?._id || isLoading}
                  >
                    {assigningId === boy?._id ? 'Assigning...' : 'Assign Delivery'}
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map2;

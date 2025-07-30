import { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
// import { useGetShopDetailsByIdQuery } from "../redux/appSlice";
import { useGetShopDetailsByIDQuery, useLogoutFromMutation } from '../redux/appSlice';
import { useSelector } from "react-redux";
import toast from 'react-hot-toast';

const Header = ({ toggleSidebar }) => {
  const [logoutFrom, { isLoading, isSuccess, data }] = useLogoutFromMutation();
  // console.log(data);
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.auth);

  const profileData = useGetShopDetailsByIDQuery(user?._id);
  console.log("profileData",profileData);


  const titles = [
    { path: "/home/dashboard", title: "Dashboard" },
    { path: "/home/manageUsers", title: "Orders" },
    { path: "/home/addservice", title: "Add Service" },
    { path: "/home/revenue", title: "Revenue" },
    { path: "/home/addphotos", title: "Photos" },
    { path: "/home/delivery-boys", title: "Delivery Boys" },
    { path: "/home/offers", title: "Offers" },
  ];

  const currentTitle =
    titles.find((t) => location.pathname.startsWith(t.path))?.title || "Shop Panel";



const handleLogout = async () => {
  try {
    const res = await logoutFrom().unwrap();
    console.log('Logout successful:', res);

    toast.success('Logged Out Successfully', {
      duration: 3000,
      style: {
        border: '1px solid #22c55e',
        padding: '12px 20px',
        color: '#16a34a',
        fontWeight: 'bold',
      },
      iconTheme: {
        primary: '#22c55e',
        secondary: '#f0fdf4',
      },
    });

    navigate('/signin');

  } catch (error) {
    console.error('Logout failed:', error);
    toast.error('Logout Failed ❌');
  }
};



  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);



  return (
    <>
      <header className="bg-white shadow-md p-4 flex items-center justify-between font-dm w-[100vw] md:w-[unset] md:py-4">
        <button onClick={toggleSidebar} className="text-gray-900 text-2xl md:hidden">
          <FaBars />
        </button>
        <h1 className="text-black font-bold md:text-2xl">{currentTitle}</h1>

        <FaUserLarge
          onClick={() => setIsSidebarOpen(true)}
          className="md:mr-14 text-2xl text-[#8EDF4C] cursor-pointer transition-[0.3s] hover:text-black"
        />
      </header>


      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300" />
      )}


      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-[90vw] md:w-[500px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } rounded-tl-[40px] rounded-bl-[] shadow-2xl`}
      >

        <div className="flex items-center justify-between px-10 pt-6">
          <div className="flex items-center gap-4">
            <div className="border-2 border-[#8EDF4C] rounded-full p-4">
              <FaUserLarge className="text-3xl text-[#8EDF4C]" />
            </div>
            <h2 className="text-xl font-semibold">Planet wash laundry</h2>
          </div>
          <div className="flex items-center gap-3">
            <IoClose
              onClick={() => setIsSidebarOpen(false)}
              className="text-2xl text-gray-600 hover:text-red-500 cursor-pointer"
            />
          </div>
        </div>


        <div className="mt-6 px-10 space-y-4 text-sm md:text-base text-gray-800 overflow-y-scroll scrollbar-hidden max-h-[60vh]">
          <div>
            <p className="font-medium text-gray-700">Shop Owner Name</p>
            <p className="text-gray-500 border-b border-gray-200 pb-1">{profileData?.data?.shop?.ownerName}</p>
          </div>

          <div>
            <p className="font-medium text-gray-700">Shop Name</p>
            <p className="text-gray-500 border-b border-gray-200 pb-1">{profileData?.data?.shop?.shopName}</p>
          </div>

          <div>
            <p className="font-medium text-gray-700">Contact No</p>
            <p className="text-gray-500 border-b border-gray-200 pb-1">{profileData?.data?.shop?.contactNo}</p>
          </div>

          <div>
            <p className="font-medium text-gray-700">Email</p>
            <p className="text-gray-500 border-b border-gray-200 pb-1">{profileData?.data?.shop?.email}</p>
          </div>

          <div>
            <p className="font-medium text-gray-700">Address</p>
            <p className="text-gray-500 border-b border-gray-200 pb-1">
              {profileData?.data?.shop?.address}
            </p>
          </div>

          <div>
            <p className="font-medium text-gray-700">Description</p>
            <p className="text-gray-500 border-b border-gray-200 pb-1">
              {profileData?.data?.shop?.description}
            </p>
          </div>
        </div>


        <div className="px-10 mt-10">
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className={`flex items-center gap-2 py-2 px-4 rounded-xl text-base font-semibold transition-all ${isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#00B2FF] hover:bg-[#009ee0] text-white'
              }`}
          >
            <span className="text-lg">⏻</span> {isLoading ? 'Logging out...' : 'Logout'}
          </button>

        </div>
      </div>
    </>
  );
};

export default Header;

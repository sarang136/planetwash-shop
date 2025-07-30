import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GoHomeFill } from "react-icons/go";
import { FaCreditCard } from "react-icons/fa6";
import { MdPhotoSizeSelectActual, MdDeliveryDining, MdStickyNote2 } from "react-icons/md";
import { FiPlusCircle } from 'react-icons/fi';
import { FaTag } from 'react-icons/fa';

const menuItems = [
  { name: "Dashboard", path: "/", icon: <GoHomeFill /> },
  { name: "Orders", path: "/manageUsers", icon: <FaCreditCard /> }, // Manage Users --> Orders
  { name: "Add Service", path: "/addservice", icon: <FiPlusCircle /> },   // Admin Panel to Add services
  { name: "Revenue", path: "/revenue", icon: <FaCreditCard /> },
  { name: "Add Photos", path: "/addphotos", icon: <MdPhotoSizeSelectActual /> },
  { name: "Delivery Boys", path: "/delivery-boys", icon: <MdDeliveryDining /> },
  { name: "Offers", path: "/Offers", icon: <FaTag /> },
  { name: "Expenses", path: "/shop-notes", icon: <MdStickyNote2 /> },
];




const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  console.log("side bar location", location);

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  return (
    <>
      <div className={`md:relative inset-y-0 left-0 bg-white text-black   transform transition-transform duration-300 z-40 font-dm px-6
            ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-80 w-72 fixed`}>


        {/* Close Button (Mobile) */}
        <button onClick={toggleSidebar} className="text-2xl mb-5 md:hidden">
          ✖
        </button>

        {/* Logo */}
        <div className='flex justify-center p-0 '>
          <img src="../Images/newLogo.png" alt="Logo" className='h-[70px] md:h-[130px]' />
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-6 p-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleNavClick}

                className="block"
              >
                <div
                  className={`
    relative flex items-center gap-4 p-[4px] md:p-2 pl-4 pr-4 rounded-xl w-full
    text-[#019ECE] hover:text-[#8EDF4C]
    before:content-[""] before:absolute before:top-1/2 before:left-0 
    before:-translate-y-1/2 before:h-2/3 before:w-1 before:rounded-full 
    before:bg-transparent
    ${isActive ? 'text-[#8EDF4C] before:bg-[#052344]' : ''}
  `}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm md:text-xl">{item.name}</span>
                </div>
              </Link>
            );
          })}





        </nav>

      </div>

      {/* Overlay (Click to Close on Mobile) */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-10 md:hidden" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;

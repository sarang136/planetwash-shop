import React, { useState } from 'react'
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Outlet } from "react-router-dom";


const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="flex min-h-screen ">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className={`flex flex-col flex-1 transition-all  duration-300 ${isSidebarOpen ? "md:ml-64" : "md:ml-0"}`}>
                <Header toggleSidebar={toggleSidebar} />
                <main className="md:p-4 bg-gray-100 flex-1 overflow-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout
import React, { useState } from 'react';

const DeliveryOrders = ({ deliveryBoy }) => {
    const [activeTab, setActiveTab] = useState('assign'); // 'assign' | 'ongoing' | 'past'

    return (
        <div className='p-4 '>
            <div className="bg-white rounded-xl border-2 border-gray-300 font-dm max-w-full h-[50vh] overflow-y-scroll">
            {/* Tabs */}
           <div className="sticky top-0 z-50 w-full flex gap-[50px] border-b border-gray-300 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 p-4 bg-white ">

                {['assign', 'ongoing', 'past'].map(tab => (
                    <div
                        key={tab}
                        className={`flex-shrink-0 p- border-b-[3px]  cursor-pointer whitespace-nowrap ${activeTab === tab ? 'border-blue-900' : 'border-transparent'
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        <h2 className="md:text-xl font-medium text-[rgba(5,35,68,1)] capitalize ">
                            {tab === 'assign' ? 'Assign Orders' : tab === 'ongoing' ? 'Ongoing Orders' : 'Past Orders'}
                        </h2>
                    </div>
                ))}
            </div>

            {/* Table */}
            {/* Table */}
            <div className="overflow-x-auto  p-4">
                <table className="min-w-[800px] w-full border-gray-200 table-fixed sm:table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left px-2 py-3 text-gray-600 text-sm sm:text-base ">Customer Name</th>
                            <th className="text-left px-2 py-3 text-gray-600 text-sm sm:text-base">Contact No</th>
                            <th className="text-left px-2 py-3 text-gray-600 text-sm sm:text-base">Email</th>
                            <th className="text-left px-2 py-3 text-gray-600 text-sm sm:text-base">Total Items</th>
                            <th className="text-left px-2 py-3 text-gray-600 text-sm sm:text-base whitespace-nowrap">Delivery Type</th>
                            <th className="text-left px-2 py-3 text-gray-600 text-sm sm:text-base">Address</th>
                            <th className="text-left px-2 py-3 text-gray-600 text-sm sm:text-base">Amount</th>
                            {activeTab === 'past' && (
                                <th className="text-center px-2 py-3 text-gray-600 text-sm sm:text-base">Completed On</th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td className="px-2 py-2 text-left align-top text-gray-500 text-sm sm:text-base">John Doe</td>
                            <td className="px-2 py-2 text-left  align-top text-gray-500 text-sm sm:text-md">9876338893</td>
                            <td className="px-2 py-2  text-left  align-top text-gray-500 text-sm sm:text-md">john@gmail<br/>.com</td>
                            <td className="px-2 py-2  text-left  align-top text-gray-500 text-sm sm:text-md">20</td>
                            <td className="px-2 py-2  text-left  align-top text-gray-500 text-sm sm:text-md">Pick Up</td>
                            <td className="px-2 py-2 text-left  align-top text-gray-500 text-sm sm:text-md">Golden City Center,<br/> Chh Sambhajinagar</td>
                            {activeTab === 'past' && (
                                <td className="px-2 py-2 sm:px-6 sm:py-4 text-center align-top text-sm sm:text-md">20/05/2025</td>
                            )}

                            <td className="px-2 py-2 sm:px-6 sm:py-4 text-center align-top">
                                {activeTab === 'assign' ? (
                                    <button className="py-2 bg-blue-900 text-white rounded-xl text-xs sm:text-sm sm:px-4 whitespace-nowrap">
                                        Assign to Other
                                    </button>
                                ) : activeTab === 'ongoing' ? (
                                    <span className="px-3 py-2 text-green-600 font-semibold text-xs sm:text-sm">Live</span>
                                ) : null}
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

        </div>
        </div>
    );
};

export default DeliveryOrders;

import React from "react";

const PendingApprovals = () => {
    // Static Data (Future mein API se aa sakta hai)
    const approvals = [
        {
            id: 1,
            name: "Rahul Sharma",
            mobile: "+91 9876543210",
            email: "rahul.sharma@example.com",
            businessAddress: "123, MG Road, Mumbai",
            companyName: "Sharma Enterprises",
            gstNumber: "27AAECS1234L1ZB",
        },
        {
            id: 2,
            name: "Priya Verma",
            mobile: "+91 9988776655",
            email: "priya.verma@example.com",
            businessAddress: "456, Brigade Road, Bangalore",
            companyName: "Verma Traders",
            gstNumber: "29AACCV1234F1Z9",
        },
    ];

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {approvals.map((approval) => (
                    <div key={approval.id} className="bg-white shadow-md rounded-lg border p-4 h-auto flex flex-col">
                        {/* Business Details Form-like Layout */}
                        <div className="space-y-2">
                            {[
                                { label: "Name", value: approval.name },
                                { label: "Mobile No", value: approval.mobile },
                                { label: "Email", value: approval.email },
                                { label: "Business Address", value: approval.businessAddress },
                                { label: "Company Name (as per GST Certificate)", value: approval.companyName },
                                { label: "GST Number", value: approval.gstNumber },
                            ].map((field, index) => (
                                <div key={index} className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-600">{field.label}</label>
                                    <div className="border p-2 rounded-md bg-gray-100 text-gray-800">{field.value}</div>
                                </div>
                            ))}
                            <div className="flex justify-center gap-4 mt-5">
                                <button className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 ">
                                    Accept
                                </button>
                                <button className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 ">
                                    Reject
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default PendingApprovals;

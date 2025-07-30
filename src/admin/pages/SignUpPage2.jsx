import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage2 = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ownerName: '',
    contactCode: '+91',
    contactNo: '',
    email: '',
    shopName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = (e) => {
    e.preventDefault();
    navigate('/signup/step-3', { state: formData });
  };

  const inputBase =
    'mt-1 block w-full text-lg px-4 py-2 rounded-xl border bg-[#F4F7FE] text-gray-700 focus:outline-none';

  const isButtonDisabled =
    !formData.ownerName ||
    !formData.shopName ||
    !formData.contactNo ||
    !formData.email;

  return (
    <div className='h-[100vh]'>
      <div className="flex bg-gradient-to-b from-[#052344] to-[#000000] justify-center font-dm p-16 h-full">
        <div className="flex w-8/12 rounded-[60px] overflow-hidden border-8 border-cyan-400 shadow-lg">
          <div className="w-full bg-white p-8 overflow-scroll scrollbar-hide">
            <div className='flex justify-center'>
              <img src="/Images/newLogo.png" alt="Logo" className="h-[60px]" />
            </div>
            <form className="space-y-6" onSubmit={handleContinue}>
              <div className="space-y-4">
                <div>
                  <label className="block text-md font-medium text-gray-700">Owner Name</label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    className={inputBase}
                    placeholder="Enter owner name"
                  />
                </div>

                <div>
                  <label className="block text-md font-medium text-gray-700">Contact No</label>
                  <div className="flex gap-2">
                    <select
                      name="contactCode"
                      value={formData.contactCode}
                      onChange={handleChange}
                      className="px-4 py-4 rounded-xl border border-gray-100 bg-[#F4F7FE] text-gray-700 focus:outline-none"
                    >
                      <option value="+91">+91 (India)</option>
                      <option value="+1">+1 (USA)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+61">+61 (Australia)</option>
                    </select>
                    <input
                      type="number"
                      name="contactNo"
                      value={formData.contactNo}
                      onChange={handleChange}
                      className={inputBase}
                      placeholder="Enter contact number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-md font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputBase}
                    placeholder="Enter email"
                  />
                </div>

                <div>
                  <label className="block text-md font-medium text-gray-700">Shop Name</label>
                  <input
                    type="text"
                    name="shopName"
                    value={formData.shopName}
                    onChange={handleChange}
                    className={inputBase}
                    placeholder="Enter shop name"
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isButtonDisabled}
                  className={`w-[150px] text-white font-semibold text-md py-3 rounded-2xl transition-all ${isButtonDisabled
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[rgba(142,223,76,1)] hover:bg-[rgb(120,188,64)]'
                    }`}
                >
                  Continue
                </button>
              </div>
            </form>
          </div>

          <div className="w-8/12 hidden md:flex flex-col justify-end p-4 bg-[#00B4F1]">
            <div className='flex  justify-center mb-[20px]'>
              {/* <img className='w-[200px]' src='../Images/newLogo.png' /> */}
            </div>
            <h1 className="text-white text-6xl font-bold mb-4 text-center">Sign Up</h1>
            <p className="text-black text-sm mb-3 text-center ">
               Already Have An Account?{' '}
              <span
               className="underline cursor-pointer font-semibold text-white transition duration-200 hover:text-red-500"

                onClick={() => navigate('/signin')}
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage2;

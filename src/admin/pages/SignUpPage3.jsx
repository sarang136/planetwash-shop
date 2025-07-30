import React, { useState } from 'react';
import Logo from '../../../public/Frame 5.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsCloudUploadFill } from "react-icons/bs";
import { useRegisterShopMutation } from '../redux/appSlice';

const SignUpPage3 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const preData = location.state || {};
  const email = preData.email;

  const [shopAddress, setShopAddress] = useState("");
  const [shopImage, setShopImage] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [fadeOut, setFadeOut] = useState(false); // For transition

  const [registerShop, { isLoading }] = useRegisterShopMutation();

  const handleContinue = async (e) => {
    e.preventDefault();
    setError("");

    if (!shopAddress || !shopImage || !description) {
      setError("Please fill all the fields");
      return;
    }

    const formData = new FormData();
    formData.append("address", shopAddress);
    formData.append("image", shopImage);
    formData.append("description", description);

    if (preData) {
      formData.append("email", preData.email || "");
      formData.append("shopName", preData.shopName || "");
      formData.append("ownerName", preData.ownerName || "");
      formData.append("contactNo", preData.contactNo || "");
    }

    try {
      const res = await registerShop(formData).unwrap();
      console.log("API Response:", res);
      setFadeOut(true); // Trigger fade out
      setTimeout(() => {
        navigate("/signup/verify", { state: { email } });
      }, 400); // Delay to allow animation
    } catch (err) {
      console.error("Error during registration:", err);
      setError(err?.data?.message || "Something went wrong. Please try again.");
    }
  };

  const inputBase = "mt-1 block w-full text-lg px-4 py-2 rounded-xl border bg-[#F4F7FE] text-gray-700 focus:outline-none";

  return (
    <div className={`h-[100vh] transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex bg-gradient-to-b from-[#052344] to-[#000000] justify-center font-dm p-16 h-full">
        <div className="flex w-8/12 rounded-[60px] overflow-hidden border-8 border-cyan-400 shadow-lg">
          
          {/* Left Form Section */}
          <div className="w-full bg-white p-8">
            <div className="flex justify-center mb-8">
              <img src="../Images/newLogo.png" alt="Logo" className="h-[60px]" />
            </div>

            <form onSubmit={handleContinue} className="space-y-6">
              <div className="space-y-4">

                <div>
                  <label className="block text-md lg:text-xl font-medium text-gray-700">Shop Address</label>
                  <input
                    type="text"
                    placeholder="Enter"
                    value={shopAddress}
                    onChange={(e) => setShopAddress(e.target.value)}
                    className={inputBase}
                  />
                </div>

                <div>
                  <label className="block text-md lg:text-xl font-medium text-gray-700">Shop Image</label>
                  <div className="relative mt-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setShopImage(e.target.files[0])}
                      className={`${inputBase} pr-12`}
                    />
                    <BsCloudUploadFill
                      size={24}
                      className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-md lg:text-xl font-medium text-gray-700">Description</label>
                  <input
                    type="text"
                    placeholder="Enter"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={inputBase}
                  />
                </div>
              </div>

              {error && <p className="text-red-600 font-semibold">{error}</p>}

              <div className="text-center mt-8">
                <button
                  type="submit"
                  className="w-[140px] p-4 bg-[#052344] text-white font-semibold text-md py-3 rounded-2xl hover:bg-[#031a30] transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Continue"}
                </button>
              </div>
            </form>
          </div>

          {/* Right Info Section */}
          <div className="w-8/12 hidden md:flex flex-col justify-end p-4 bg-[#00B4F1]">
           <div className='flex  justify-center mb-[20px]'>
              {/* <img className='w-[200px]' src='../Images/newLogo.png' /> */}
            </div>
            <h1 className="text-white text-6xl font-bold mb-4 text-center">Sign In</h1>
            <p className="text-white text-sm mb-3 text-center">
              Already Have An Account?{' '}
              <span
                className="underline cursor-pointer font-semibold text-black transition duration-200 hover:text-red-500"
                onClick={() => navigate("/signin")}
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

export default SignUpPage3;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSendOtpMutation } from '../redux/appSlice';
import Logo from '/Frame 5.png';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [sendOtp, { data, isSuccess, isError, error, isLoading }] = useSendOtpMutation();
  const [msg, setMsg] = useState(false);
  const [buttonText, setButtonText] = useState('Send OTP');
  const [fadeOut, setFadeOut] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email || !email.endsWith('@gmail.com')) {
      alert('Please enter a valid Gmail address.');
      return;
    }
    try {
      setButtonText('Sending...');
      await sendOtp({ email }).unwrap();
      setButtonText('OTP Sent');
      setFadeOut(true);
      setTimeout(() => {
        navigate('/Login-otp', { state: { email, islogin: true } });
       
      }, 300);
    } catch (err) {
      console.error('Failed to send OTP:', err);
      setButtonText(err?.data?.message || 'Something went wrong');
      // setButtonText(setMsg(true));
    }
  };

  useEffect(() => {
    if (isSuccess && data?.success) {
      setFadeOut(true);
      setTimeout(() => {
        navigate('/Login-otp', { state: { email, islogin: true } });
      }, 300);
    }
    if (isError) {
      alert(error?.data?.message || 'Failed to send OTP');
    }
  }, [isSuccess, isError, data, error, email, navigate]);

  const isButtonDisabled = isLoading || !email.endsWith('@gmail.com');

  return (
    <div
      className={`flex bg-gradient-to-b from-[#052344] to-[#000000] justify-center font-dm h-[100vh] p-16 transition-opacity duration-300 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex rounded-[60px] overflow-hidden border-8 border-cyan-400 shadow-lg">
        <div className="w-full bg-white p-6 flex flex-col justify-center">
          <div className="flex justify-center mb-6">
            <img src="./Images/newLogo.png" alt="Logo" className="w-[200px] lg:w-[300px]" />
          </div>

          <form className="space-y-6" onSubmit={handleSendOtp}>
            <div>
              <label className="block text-md lg:text-xl font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full text-lg px-4 py-4 rounded-xl border bg-[#F4F7FE] text-gray-700 focus:outline-none border-gray-100"
              />
            </div>

            <div className="text-center mt-8">
              <button
                type="submit"
                disabled={isButtonDisabled}
                className={`w-[140px] sm:px-4 sm:py-3 text-white font-semibold text-sm py-2 rounded-2xl transition-all  ${
                  isButtonDisabled
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[rgba(142,223,76,1)] hover:bg-[rgb(120,188,64)]'
                }`}
              >
                {buttonText}
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col justify-end p-6 h-full bg-[#00B4F1] w-[40vw]">
       <div className='flex  justify-center mb-[20px]'>
           {/* <img className='w-[200px]' src='./Images/newLogo.png'/> */}
       </div>
          <p className="text-white font-bold text-6xl mb-4 text-center">Sign In</p>
          <p className="text-black text-sm text-center">
            Don’t Have Account?{' '}
            <span
              className="underline cursor-pointer font-semibold items-center text-white transition duration-200 hover:text-red-500"
              onClick={() => navigate('/signup/step-2')}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

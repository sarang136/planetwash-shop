import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useVerifyOtpMutation } from '../redux/appSlice';

const LoginOtp = () => {
  const location = useLocation();
  const email = location.state?.email || '';
  const isLogin = location.state?.islogin || false;

  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [fadeOut, setFadeOut] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [,] = useState(0);

  const navigate = useNavigate();

  const [verifyOtp, { isLoading, isError }] = useVerifyOtpMutation();


  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!otp || otp.length !== 4) {
      setMessage('Please enter a valid 4-digit OTP.');
      return;
    }

    try {
      const res = await verifyOtp({ email, otp, isLogin }).unwrap();


      const isButtonDisabled = !otp
      if (res.message === 'Login successful') {
        setFadeOut(true)
         localStorage.setItem('token',"this is token")
        setTimeout(() => {
          navigate('/' ,{state:res});
        }, 300);
      } else {
        setMessage(res?.message || 'Invalid OTP.');
      }
    } catch (err) {
      console.error('OTP verification failed', err);
      setMessage(err?.data?.message || 'OTP verification failed.');
    }
  };

  const handleResendOtp = () => {
    if (!otp) {
      alert('Please enter OTP before resending.');
      return;
    }
    alert('OTP sent on the mail');
    setResendTimer(45);
  };

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const isResendDisabled = resendTimer > 0 || !otp;

  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-[#001F3F] to-black px-4 h-[100vh]">
      <div className=" w-8/12 h-[80vh] bg-white rounded-[60px] flex overflow-hidden shadow-xl border-8 border-cyan-400">

        {/* Left Side */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          {/* Logo */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-[#54C11A] leading-none flex justify-center" >
               <img className='h-[100px] ' src='./Images/newLogo.png'/>
            </h1>
            {/* <p className="text-xs text-gray-600 mt-1">The Laundry Company</p> */}
          </div>

          {/* OTP Form */}
          <form
            onSubmit={handleVerify}
            className={`space-y-6 transition-opacity duration-300 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
          >
            <p className="text-sm mb-2 font-medium">Enter OTP sent to you</p>

            <input
              type="text"
              placeholder="____"
              maxLength={4}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full tracking-widest text-center text-2xl px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 ring-blue-500"
            />

            <p className="text-sm">
              Didn’t Receive?{' '}
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isResendDisabled}
                className={`font-semibold ${isResendDisabled
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-black hover:text-blue-500'
                  }`}
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend'}
              </button>
            </p>

            {message && (
              <p className={`text-sm ${isError ? 'text-red-600' : 'text-green-600'}`}>
                {message}
              </p>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading || otp.length !== 4}
                className={`bg-[#A1E43C] text-white rounded-lg px-8 py-2 transition-all ${isLoading || otp.length !== 4
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-blue-600'
                  }`}
              >
                {isLoading ? 'Verifying...' : 'Sign In'}
              </button>

            </div>
          </form>
        </div>

        {/* Right Side */}
        <div className="w-1/2  bg-[#00B6FF]  text-white flex flex-col justify-end p-4 relative">
          <div className="absolute w-56 h-56 bg-green-400 rounded-full opacity-10 top-10 right-10" />
          <div className="absolute w-40 h-40 bg-green-200 rounded-full opacity-10 bottom-10 left-10" />
          <h2 className="text-4xl font-bold mb-4">Sign In</h2>
          <p className="text-sm">
            Don’t Have Account?{' '}
            <button
              className="underline cursor-pointer hover:text-black"
              onClick={() => navigate('/signup/step-2')}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginOtp;

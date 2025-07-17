import React, { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { mockCountryCodeData } from "../constants/countrycode";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ loginInfo }) => {
  const navigate = useNavigate();

  const inputPhoneNumSchema = z.object({
    phone: z
      .string()
      .min(10, "Phone number must have 10 digits")
      .regex(/^\d+$/, "Phone number containes only numbers"),
  });

  const otpSchema = z.object({
    oTp: z
      .string()
      .min(6, "Phone number must be 6 digits")
      .regex(/^\d+$/, "Numeric"),
  });

  const {
    register: phoneNumRegister,
    handleSubmit: handlePhoneNumSubmit,
    formState: { errors: numErrors },
    reset: resetPhoneNum,
  } = useForm({
    resolver: zodResolver(inputPhoneNumSchema),
  });

  const {
    register: otpRegister,
    handleSubmit: handleOtp,
    formState: { errors: otpErrors },
    reset: resetOtp,
  } = useForm({
    resolver: zodResolver(otpSchema),
  });

  const [countrycode, setCountryCode] = useState("+91");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState(false);

  const onPhoneSubmit = (data) => {
    const sentOtp = Math.floor(10000 + Math.random() * 900000);
    setTimeout(() => {
      setOtp(sentOtp.toString());
      setSentOtp(true);
      alert(`Otp sent ${sentOtp} to phone number ${data.phone}`);
    }, 1000);
    resetPhoneNum();
  };

  const onOtpSubmit = (data) => {
    if (data.oTp === otp) {
      alert("OTP is verified");
      navigate("/dashboard");
    } else {
      alert("OTP is Invalid, Try again");
    }
    resetOtp();
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-500 px-4 rounded-md">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {sentOtp ? "Enter OTP" : "Login / Sign Up"}
        </h2>

        {!sentOtp ? (
          <form
            onSubmit={handlePhoneNumSubmit(onPhoneSubmit)}
            className="space-y-4"
          >
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country Code
              </label>
              
            </div> */}

            <div className="flex">
              <select
                className="border-gray-300 rounded-lg shadow-sm"
                onChange={(e) => setCountryCode(e.target.value)}
                value={countrycode}
              >
                {mockCountryCodeData.map((code, index) => (
                  <option key={index}>{code.dial_code}</option>
                ))}
              </select>
              <input
                type="phone"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 ml-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter Phone Number"
                {...phoneNumRegister("phone")}
              />
              {numErrors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {numErrors.phone.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg transition hover:cursor-pointer"
            >
              Continue
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtp(onOtpSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                OTP
              </label>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter OTP"
                {...otpRegister("oTp")}
              />
              {otpErrors.oTp && (
                <p className="text-red-500 text-sm mt-1">
                  {otpErrors.oTp.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Verify
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;

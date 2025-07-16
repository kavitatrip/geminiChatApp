import React, { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { mockCountryCodeData } from "../constants/countrycode";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ loginInfo }) => {
  const navigate = useNavigate();

  const inputPhoneNumSchema = z.object({
    phone: z.string().min(10, "Phone number must have 10 digits").regex(/^\d+$/, "Phone number containes only numbers")
  });

  const otpSchema = z.object({
    oTp: z.string().min(6, "Phone number must be 6 digits").regex(/^\d+$/, "Numeric")
  });
  
  const {
    register: phoneNumRegister,
    handleSubmit: handlePhoneNumSubmit,
    formState: { errors: numErrors },
    reset: resetPhoneNum,
  } = useForm({
    resolver: zodResolver(inputPhoneNumSchema)
  });

  const {
    register: otpRegister,
    handleSubmit: handleOtp,
    formState: { errors: otpErrors },
    reset: resetOtp,
  } = useForm({
    resolver: zodResolver(otpSchema)
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
    } else {
      alert("OTP is Invalid, Try again");
    }
    resetOtp();
    navigate("/dashboard")
  };

  return (
    <div>
      Login Page/SignUp
      <div>
        {!sentOtp ? (
          <form onSubmit={handlePhoneNumSubmit(onPhoneSubmit)}>
            <select
              onChange={(e) => setCountryCode(e.target.value)}
              value={countrycode}
            >
              {mockCountryCodeData.map((code, index) => (
                <option key={index}>{code.dial_code}</option>
              ))}
            </select>
            <input
              placeholder="Enter Phone Number"
              {...phoneNumRegister("phone")}
            />
            {numErrors.phone && <p>{numErrors.phone.message}</p>}
            <button>Continue</button>
          </form>
        ) : (
          <form onSubmit={handleOtp(onOtpSubmit)}>
            <input
              placeholder="Enter OTP"
              {...otpRegister("oTp")}
            />
            {otpErrors.oTp && <p>{otpErrors.oTp.message}</p>}
            <button>Verify</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;

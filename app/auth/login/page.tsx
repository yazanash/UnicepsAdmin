"use client";
import React from "react";
import { useState } from "react";
import { api } from "@/lib/api";
import Image from "next/image";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
const Login = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [isLoading, setIsLoading] = useState(false);
  const login = async () => {
    setIsLoading(true);
    if (step == "email") {
      await api.post("/Authentication", { email: email });
      setStep("code");
    } else {
      await api.post("/Authentication/VerifyOtp", { email: email, Otp: code });
      window.location.href = "/admin";
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex border overflow-clip shadow-xl bg-white rounded-2xl border-gray-300 ">
        <section className="p-5 py-7 bg-white  rounded border-gray-300 flex flex-col items-center justify-start ">
          <Image
            src="/Logo/Uni-Logo.png"
            alt="Uniceps logo"
            width={100}
            height={100}
          ></Image>
          <h1 className="text-2xl font-bold">Welcome To Uniceps </h1>
          <p className="text-gray-700 text-base">Login now !</p>
          <form className="flex flex-row w-full rounded-md border-2 border-gray-400 my-2.5">
            <label
              htmlFor="first-name"
              className="block text-3xl my-auto px-2 text-gray-600"
            >
              <MdOutlineEmail />
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              readOnly={step === "code"}
              className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-gray-700 outline-0 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-0 focus:outline-blue-500"
            />
            {/* <button type="submit">Send Code</button> */}
          </form>

          <form className="flex flex-row w-full rounded-md border-2 border-gray-400 my-2.5">
            <label
              htmlFor="first-name"
              className="block text-3xl my-auto px-2 text-gray-600"
            >
              <MdLockOutline />
            </label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Activation Code"
              readOnly={step === "email"}
              className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-gray-700 outline-0 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-0 focus:outline-blue-500"
            />
            {/* <button type="submit">Verify</button> */}
          </form>
          <button
            className="py-2 my-2.5 w-full  rounded-md text-white bg-blue-500 hover:opacity-95 "
            onClick={login}
          >
            {isLoading ? (
              <div className="flex flex-row justify-center items-center">
                <div className="flex items-center justify-center mx-2">
                  <div className="w-5 h-5 border-3 border-blue-500 border-t-white border-l-white border-solid rounded-full animate-spin"></div>
                </div>
                {step === "email" ? "Sending Code " : "Verifing Code"}
              </div>
            ) : step === "email" ? (
              "Send Code"
            ) : (
              "Verify Code"
            )}
          </button>
        </section>
      </div>
    </div>
  );
};

export default Login;

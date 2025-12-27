"use client";
import React, { useState } from "react";
import { api } from "@/lib/api";
import Image from "next/image";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setIsLoading(true);
    try {
      if (step === "email") {
        await api.post("/Authentication", { email: email });
        setStep("code");
      } else {
        await api.post("/Authentication/VerifyOtp", { email: email, Otp: code });
        window.location.href = "/admin";
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* عناصر الإضاءة الخلفية لتماشي الموقع */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0095A6]/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#46cdcf]/10 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-md px-6"
      >
        <section className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl flex flex-col items-center">
          {/* الشعار */}
          <div className="mb-6 relative">
             <div className="absolute inset-0 bg-[#46cdcf]/20 blur-xl rounded-full" />
             <Image
              src="/Logo/Uni-Logo.png"
              alt="Uniceps logo"
              width={80}
              height={80}
              className="relative"
            />
          </div>

          <h1 className="text-3xl font-black text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-sm mb-8">Access the Uniceps Admin Dashboard</p>

          <div className="w-full space-y-4">
            {/* حقل الإيميل */}
            <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all duration-300 ${
              step === "email" ? "border-[#46cdcf]/50 bg-[#46cdcf]/5" : "border-white/5 bg-white/5 opacity-60"
            }`}>
              <MdOutlineEmail className="text-2xl text-[#46cdcf]" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin Email"
                readOnly={step === "code"}
                className="bg-transparent w-full text-white outline-none placeholder:text-gray-500"
              />
            </div>

            {/* حقل الكود - يظهر بتأثير أنيق */}
            <AnimatePresence>
              {step === "code" && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-[#46cdcf]/50 bg-[#46cdcf]/5 transition-all duration-300"
                >
                  <MdLockOutline className="text-2xl text-[#46cdcf]" />
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Verification Code"
                    autoFocus
                    className="bg-transparent w-full text-white outline-none placeholder:text-gray-500"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              disabled={isLoading}
              onClick={login}
              className="w-full py-4 mt-4 rounded-2xl bg-[#46cdcf] text-black font-bold text-lg hover:bg-[#3bb3b5] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>{step === "email" ? "Send Magic Link" : "Verify & Login"}</span>
              )}
            </button>

            {step === "code" && (
                <button 
                    onClick={() => setStep("email")}
                    className="w-full text-center text-sm text-gray-500 hover:text-[#46cdcf] transition-colors mt-2"
                >
                    Change Email?
                </button>
            )}
          </div>
        </section>

        <p className="text-center text-gray-600 text-xs mt-8">
            © 2025 Uniceps Ecosystem. Secure Admin Access.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
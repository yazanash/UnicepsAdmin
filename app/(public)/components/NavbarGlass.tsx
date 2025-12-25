"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
const NavbarGlass = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // إذا نزل المستخدم أكثر من 20 بكسل، نغير الحالة
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
      fixed top-0 left-0 w-full z-50 transition-all duration-300
      ${isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"}
    `}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex flex-row items-center">
          <Image
            src="/Logo/Uni-Logo.png"
            alt="Uniceps logo"
            width={50}
            height={50}
          />
          <span className="text-white font-bold text-xl mx-1">Uniceps</span>
        </div>
        <Link href="/admin">
          <button
            className="
          px-4 py-2 rounded-xl
         border border-gray-400
          text-white
        "
          >
            Admin Dashboard
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavbarGlass;

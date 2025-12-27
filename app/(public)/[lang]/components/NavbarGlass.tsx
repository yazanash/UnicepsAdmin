"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarGlass = ({ dict, lang }: { dict: any; lang: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const redirectedPathname = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

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
        <div >
          <Link href="/" className="flex flex-row items-center">
          <Image
            src="/Logo/Uni-Logo.png"
            alt="Uniceps logo"
            width={50}
            height={50}
          />
          <span className="text-white font-bold text-xl mx-1">Uniceps</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={redirectedPathname(lang === "en" ? "ar" : "en")}
            className="text-white/70 hover:text-white text-sm font-medium border border-white/10 px-3 py-1 rounded-lg transition-colors"
          >
            {lang === "en" ? "العربية" : "English"}
          </Link>
          <Link href="/admin">
            <button
              className="
       text-white/70 hover:text-white text-sm font-medium border border-white/10 px-3 py-1 rounded-lg transition-colors
        "
            >
             {dict.adminDashboard}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarGlass;

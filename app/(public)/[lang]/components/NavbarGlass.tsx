"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarGlassProps {
  dict: {
    adminDashboard?: string;
    ecosystem?: string;
    pricing?: string;
    updates?: string;
    faq?: string;
    getStarted?: string;
    [key: string]: any;
  };
  lang: string;
}

const NavbarGlass: React.FC<NavbarGlassProps> = ({ dict, lang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const redirectedPathname = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    {
      name: dict?.ecosystem || (lang === "ar" ? "المنظومة" : "Ecosystem"),
      href: "#features",
    },
    {
      name: dict?.pricing || (lang === "ar" ? "الباقات والأسعار" : "Pricing"),
      href: "#pricing",
    },
    // {
    //   name: dict?.updates || (lang === "ar" ? "التحديثات" : "Releases"),
    //   href: "#updates",
    // },
    {
      name: dict?.faq || (lang === "ar" ? "الأسئلة الشائعة" : "FAQ"),
      href: "#FAQs",
    },
  ];

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          isScrolled
            ? "bg-teal-950/20 backdrop-blur-md border-b border-slate-700/80 shadow-xl shadow-black/80"
            : "bg-teal-950/20 backdrop-blur-sm border-b border-slate-800/40"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand & Logo */}
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2.5 group shrink-0"
        >
          <Image
            src="/Logo/Uni-Logo.png"
            alt="Uniceps logo"
            width={38}
            height={38}
            className="transition-transform group-hover:scale-105"
            priority
          />
          <span className="text-white font-black text-lg tracking-wider">
            UNICEPS
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-200">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="hover:text-teal-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#pricing"
            className="bg-teal-500 hover:bg-teal-400 text-dark-950 font-black text-xs px-4 py-2 rounded-xl transition-all shadow-lg shadow-teal-500/20 shrink-0"
          >
            {dict?.getStarted || (lang === "ar" ? "تنزيل" : "Download")}
          </a>
        </div>

        {/* Actions & Utilities */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher */}
          <Link
            href={redirectedPathname(lang === "en" ? "ar" : "en")}
            className="text-slate-200 hover:text-white text-xs font-bold border border-slate-700 bg-dark-900 px-3 py-1.5 rounded-xl transition-all"
          >
            {lang === "en" ? "العربية" : "English"}
          </Link>

          {/* Admin link */}
          <Link
            href={`/admin`}
            className="text-slate-300 hover:text-white text-xs font-medium px-2 py-1.5 transition-colors"
          >
            {dict?.adminDashboard || (lang === "ar" ? "الآدمن" : "Admin")}
          </Link>

          {/* Main Direct Action Button (Primary CTA) */}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href={redirectedPathname(lang === "en" ? "ar" : "en")}
            className="text-slate-200 text-xs font-bold border border-slate-700 bg-dark-900 px-2.5 py-1.5 rounded-lg"
          >
            {lang === "en" ? "AR" : "EN"}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-200 p-2 rounded-xl border border-slate-700 bg-dark-900 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-950 border-b border-slate-700 px-6 py-5 flex flex-col gap-4 text-xs font-bold text-slate-200 shadow-2xl">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-teal-400 py-2 border-b border-slate-800"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center justify-between pt-2">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-white"
            >
              ⚙️{" "}
              {dict?.adminDashboard ||
                (lang === "ar" ? "لوحة التحكم" : "Admin")}
            </Link>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-teal-500 text-dark-950 font-black px-4 py-2 rounded-xl"
            >
              💳{" "}
              {dict?.getStarted ||
                (lang === "ar" ? "الاشتراك والأسعار" : "Get Started")}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarGlass;

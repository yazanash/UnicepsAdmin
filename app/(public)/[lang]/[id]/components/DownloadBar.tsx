"use client";
import { useState, useRef, useEffect } from "react";
import {
  FaWindows,
  FaApple,
  FaLinux,
  FaAndroid,
  FaAppStoreIos,
  FaGooglePlay,
  FaGlobe,
  FaDownload,
  FaChevronUp,
} from "react-icons/fa";
import { TargetOSEnum, DownloadSourceEnum, ReleaseType } from "@/types/release";

export default function DownloadBar({
  releases,
  lang,
}: {
  releases: ReleaseType[];
  lang: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isAr = lang === "ar";
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  if (!releases || releases.length === 0) return null;
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const getIcon = (os: TargetOSEnum, source: DownloadSourceEnum) => {
    switch (source) {
      case DownloadSourceEnum.GooglePlay:
        return <FaGooglePlay />;
      case DownloadSourceEnum.AppStore:
        return <FaAppStoreIos />;
      case DownloadSourceEnum.MicrosoftStore:
        return <FaWindows />;
      default:
        switch (os) {
          case TargetOSEnum.Windows:
            return <FaWindows />;
          case TargetOSEnum.MacOS:
            return <FaApple />;
          case TargetOSEnum.Linux:
            return <FaLinux />;
          case TargetOSEnum.IOS:
            return <FaApple />;
          case TargetOSEnum.Android:
            return <FaAndroid />;
          default:
            return <FaGlobe />;
        }
    }
  };
  const getSource = (source: DownloadSourceEnum) => {
    switch (source) {
      case DownloadSourceEnum.GooglePlay:
        return isAr ? "متجر بلاي" : "GooglePlay";
      case DownloadSourceEnum.AppStore:
        return isAr ? "متجر ابل" : "AppStore";
      case DownloadSourceEnum.MicrosoftStore:
        return isAr ? "متجر مايكروسوفت" : "MicrosoftStore";
      case DownloadSourceEnum.Website:
        return isAr ? "موقعنا الرسمي" : "Our Website";
      default:
        return <FaGlobe />;
    }
  };
  const getOs = (os: TargetOSEnum) => {
    switch (os) {
      case TargetOSEnum.Windows:
        return "Windows";
      case TargetOSEnum.MacOS:
        return "MacOS";
      case TargetOSEnum.Linux:
        return "Linux";
      case TargetOSEnum.IOS:
        return "IOS";
      case TargetOSEnum.Android:
        return "Android";
      default:
        return "Windows";
    }
  };
  return (
    <div
      ref={containerRef}
      onMouseLeave={() => setIsOpen(false)}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
    >
      {/* القائمة المنبثقة */}
      <div
        className={`mb-4 flex flex-col gap-2 transition-all duration-300 origin-bottom ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-0 opacity-0 translate-y-10"
        }`}
      >
        <div className="bg-black/90 backdrop-blur-3xl p-5 rounded-3xl border border-white/10 shadow-2xl min-w-70">
          <p className="text-base text-white px-3 py-2 uppercase tracking-widest font-bold border-b border-white/5 mb-2">
            {isAr ? "اختر النسخة" : "Select your platform"}
          </p>
          <div className="flex flex-col gap-2">
            {releases.map((rel) => (
              <a
                key={rel.id}
                href={`${BASE_URL}/Release/download/${rel.id}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)} // يغلق عند اختيار نسخة
                className="flex items-center gap-4 px-4 py-3 bg-white/5 hover:bg-[#0095A6] text-white rounded-2xl transition-all group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform text-[#0095A6] group-hover:text-white">
                  {getIcon(rel.targetOS, rel.downloadSource)}
                </span>
                <div className="flex flex-col">
                  <span className="text-base font-bold">
                    {isAr ? "تنزيل " : "Download for"} {getOs(rel.targetOS)}
                  </span>
                  <span className="text-base opacity-60">
                    {isAr ? "إصدار " : "v"}
                    {rel.version} • {getSource(rel.downloadSource)}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* الزر الرئيسي */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="flex items-center gap-3 bg-[#0095A6] hover:bg-[#007A8A] text-white px-8 py-4 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 group border border-white/20"
      >
        <FaDownload
          className={`transition-transform duration-500 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
        <span className="font-bold tracking-wide uppercase text-sm">
          {isAr ? "تحميل الآن" : "Download Now"}
        </span>
        <FaChevronUp
          className={`text-xs transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>
  );
}

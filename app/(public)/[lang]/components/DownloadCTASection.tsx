"use client";
import React from "react";
import {
  FaWindows,
  FaApple,
  FaLinux,
  FaAndroid,
  FaAppStoreIos,
  FaGooglePlay,
  FaGlobe,
  FaDownload,
} from "react-icons/fa";
import { TargetOSEnum, DownloadSourceEnum, ReleaseType } from "@/types/release";

interface DownloadCTASectionProps {
  releases: ReleaseType[];
  lang: string;
}

export default function DownloadCTASection({
  releases = [],
  lang,
}: DownloadCTASectionProps) {
  if (!releases || releases.length === 0) return null;

  const isAr = lang === "ar";
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
          case TargetOSEnum.IOS:
            return <FaApple />;
          case TargetOSEnum.Linux:
            return <FaLinux />;
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
        return isAr ? "متجر بلاي" : "Google Play";
      case DownloadSourceEnum.AppStore:
        return isAr ? "متجر أبل" : "App Store";
      case DownloadSourceEnum.MicrosoftStore:
        return isAr ? "مايكروسوفت" : "Microsoft Store";
      case DownloadSourceEnum.Website:
        return isAr ? "الموقع الرسمي" : "Official Website";
      default:
        return "";
    }
  };

  const getOsName = (os: TargetOSEnum) => {
    switch (os) {
      case TargetOSEnum.Windows:
        return "Windows";
      case TargetOSEnum.MacOS:
        return "MacOS";
      case TargetOSEnum.Linux:
        return "Linux";
      case TargetOSEnum.IOS:
        return "iOS";
      case TargetOSEnum.Android:
        return "Android";
      default:
        return "Desktop/Mobile";
    }
  };

  return (
    <section
      id="download"
      className="relative overflow-hidden rounded-3xl bg-linear-to-b from-dark-900 to-dark-950 border border-teal-500/20 p-8 md:p-12 text-center shadow-2xl"
    >
      {/* Glow Background Effect */}
      <div className="absolute inset-0 bg-teal-500/5 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto">
        <span className="bg-teal-500/10 text-teal-400 text-xs font-bold px-3.5 py-1.5 rounded-full border border-teal-500/20 uppercase tracking-widest inline-block mb-4">
          {isAr ? "جاهز للبدء؟" : "Ready to start?"}
        </span>

        <h2 className="text-2xl md:text-4xl font-black text-white mb-3 tracking-tight">
          {isAr
            ? "حمل المنظومة الآن وابدأ رحلتك"
            : "Download the ecosystem now"}
        </h2>

        <p className="text-xs md:text-sm text-slate-400 mb-8 leading-relaxed">
          {isAr
            ? "اختر الإصدار المناسب لجهازك واستمتع بأداء فائق وتجربة أوفلاين بالكامل."
            : "Choose the right version for your device and enjoy offline performance."}
        </p>

        {/* Releases Grid Buttons */}
        <div className="flex flex-row justify-center items-center">
          {releases.map((rel) => (
            <a
              key={rel.id}
              href={`${BASE_URL}/Release/download/${rel.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-dark-950/80 border border-slate-800 hover:border-teal-500/50 hover:bg-teal-950/20 transition-all group text-start shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center text-xl shrink-0 border border-teal-500/20 transition-colors">
                {getIcon(rel.targetOS, rel.downloadSource)}
              </div>
              <div className="flex flex-col grow min-w-0">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {isAr ? "تحميل لـ" : "Download for"}
                </span>
                <span className="text-sm font-black text-white truncate">
                  {getOsName(rel.targetOS)}{" "}
                  <span className="text-xs font-normal text-slate-400">
                    ({getSource(rel.downloadSource)})
                  </span>
                </span>
                <span className="text-[11px] text-teal-400 font-mono mt-0.5">
                  v{rel.version}
                </span>
              </div>
              <FaDownload className="text-slate-500 group-hover:text-white-400 transition-colors shrink-0 ms-2" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

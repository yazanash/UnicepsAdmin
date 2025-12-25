import { 
  FaWindows, 
  FaApple, 
  FaLinux, 
  FaAndroid, 
  FaAppStoreIos, 
  FaGooglePlay, 
  FaGlobe 
} from "react-icons/fa";
import { TargetOSEnum, DownloadSourceEnum, ReleaseType } from "@/types/release";

export default function DownloadBar({ releases }: { releases: ReleaseType[] }) {
  if (!releases || releases.length === 0) return null;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  // وظيفة لجلب الأيقونة المناسبة
  const getIcon = (os: TargetOSEnum, source: DownloadSourceEnum) => {
    switch (source) {
      case DownloadSourceEnum.GooglePlay: return <FaGooglePlay className="text-xl" />;
      case DownloadSourceEnum.AppStore: return <FaAppStoreIos className="text-xl" />;
      case DownloadSourceEnum.MicrosoftStore: return <FaWindows className="text-xl" />;
      default:
        // إذا كان التحميل من الموقع، نختار أيقونة بناءً على النظام
        switch (os) {
          case TargetOSEnum.Windows: return <FaWindows className="text-xl" />;
          case TargetOSEnum.MacOS: return <FaApple className="text-xl" />;
          case TargetOSEnum.Linux: return <FaLinux className="text-xl" />;
          case TargetOSEnum.IOS: return <FaApple className="text-xl" />;
          case TargetOSEnum.Android: return <FaAndroid className="text-xl" />;
          default: return <FaGlobe className="text-xl" />;
        }
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-50 bg-black/40 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shadow-2xl items-center justify-center">
      {releases.map((rel) => (
        <a
          key={rel.id}
         href={`${BASE_URL}/Release/download/${rel.id}`}
          target="_blank"
          rel="noopener noreferrer"
          title={`Download for ${rel.targetOS}`} // يظهر النص عند وضع الماوس
          className="group relative flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-[#0095A6] text-white rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
        >
          {getIcon(rel.targetOS, rel.downloadSource)}
          
          {/* Tooltip صغير يظهر فوق الأيقونة عند التحويم */}
          <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-black/80 text-[10px] px-2 py-1 rounded-md whitespace-nowrap">
             {rel.version}
          </span>
        </a>
      ))}
    </div>
  );
}
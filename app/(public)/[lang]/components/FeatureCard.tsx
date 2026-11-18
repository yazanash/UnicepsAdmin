import { FeatureType } from "@/types/productFeature";
import Image from "next/image";

interface FeatureCardProps {
  feature: FeatureType;
  isAr: boolean;
  baseUrl: string;
}

const FeatureCard = ({ feature, isAr, baseUrl }: FeatureCardProps) => {
  const imageUrl = feature.imageUrl ? `${baseUrl}${feature.imageUrl}` : "";

  return (
    <div
      key={feature.id}
      className="relative group overflow-hidden rounded-3xl border border-slate-800 bg-dark-900 shadow-xl w-75 sm:w-85 mx-auto flex flex-col justify-end aspect-square"
    >
      {/* الصورة تملأ الكارد بالكامل بدون أي فراغات */}
      {imageUrl ? (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={imageUrl}
            alt={feature.title || "Feature Image"}
            fill
            sizes="(max-width: 640px) 300px, 340px"
            quality={90}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-dark-950 flex items-center justify-center text-slate-600">
          <span>{isAr ? "لا توجد صورة" : "No Image"}</span>
        </div>
      )}

      {/* تدرج (Shade) رايق وناعم من الأسفل لتظهر الكتابة بوضوح تام فوق الصورة */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />

      {/* النصوص فوق الصورة في أسفل الكارد */}
      <div className="relative z-10 p-6 flex flex-col justify-end">
        <h3 className="font-black text-lg md:text-xl text-white mb-1.5 leading-tight drop-shadow-md">
          {isAr ? feature.titleAr : feature.title}
        </h3>
        <p className="text-xs md:text-sm text-slate-200 leading-relaxed line-clamp-2 drop-shadow">
          {isAr ? feature.descriptionAr : feature.description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
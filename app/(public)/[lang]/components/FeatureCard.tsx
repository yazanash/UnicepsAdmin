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
      className="relative group overflow-hidden rounded-3xl border border-slate-800 bg-dark-900 shadow-xl w-full h-[430px] flex flex-col justify-end"
    >
      {imageUrl ? (
        <>
          {/* 1. الخلفية الضبابية لملء المساحة بشكل أنيق وخلفية دمج متناسقة */}
          <div className="absolute inset-0 overflow-hidden bg-black/60">
            <Image
              src={imageUrl}
              alt="Background Blur"
              fill
              className="object-cover object-center filter blur-xl opacity-30 scale-125"
            />
          </div>

          {/* 2. حاوية الصورة الرئيسية (تأخذ المساحة العلوية للكرت وتترك مكان للنصوص بالأسفل) */}
          <div className="absolute inset-x-0 top-0 bottom-28 p-4 flex items-center justify-center">
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-700/50 shadow-lg bg-black/40">
              <Image
                src={imageUrl}
                alt={feature.title || "Feature Image"}
                fill
                sizes="(max-width: 640px) 300px, 340px"
                quality={90}
                className="object-contain object-center p-2 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 bg-dark-950 flex items-center justify-center text-slate-600">
          <span>{isAr ? "لا توجد صورة" : "No Image"}</span>
        </div>
      )}

      {/* تدرج الأسود تحت النصوص لضمان قراءتها بوضوح تام */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent pointer-events-none" />

      {/* صندوق النصوص في أسفل الكرت */}
      <div className="relative z-10 p-6 flex flex-col justify-end">
        <h3 className="font-black text-lg md:text-xl text-white mb-2 leading-tight">
          {isAr ? feature.titleAr : feature.title}
        </h3>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed line-clamp-2">
          {isAr ? feature.descriptionAr : feature.description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
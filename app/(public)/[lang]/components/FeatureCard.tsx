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
      // كرت مرن يتكيف مع المحتوى تماماً بدون ارتفاعات وهمية أو قص
      className="relative group overflow-hidden rounded-3xl border border-slate-800 bg-dark-900 shadow-xl w-75 sm:w-85 mx-auto flex flex-col p-5"
    >
      {/* حاوية الصورة المتكيّفة حسب شكل الصورة الأصلية */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-black/40 border border-slate-800/80 flex items-center justify-center p-2">
        {imageUrl ? (
          // استخدام Next.js Image مع خاصية unoptimized أو اعتماد ارتفاع مرن حسب النسبة
          <div className="relative w-full aspect-[4/3] flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={feature.title || "Feature Image"}
              fill
              sizes="(max-width: 640px) 300px, 340px"
              quality={90}
              className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="w-full h-40 flex items-center justify-center text-slate-600">
            <span>{isAr ? "لا توجد صورة" : "No Image"}</span>
          </div>
        )}
      </div>

      {/* النصوص بالأسفل بمرونة تامة */}
      <div className="relative z-10 flex flex-col mt-4">
        <h3 className="font-black text-lg md:text-xl text-white mb-1.5 leading-tight">
          {isAr ? feature.titleAr : feature.title}
        </h3>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed line-clamp-3">
          {isAr ? feature.descriptionAr : feature.description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
import { FeatureType } from "@/types/productFeature";
import Image from "next/image";

interface FeatureCardProps {
  feature: FeatureType;
  isAr: boolean;
  baseUrl: string;
}

const FeatureCard = ({ feature, isAr, baseUrl }: FeatureCardProps) => {
  return (
    <div
      key={feature.id}
      // حافظنا على الـ aspect-square بناءً على رغبتك لتوحيد شكل الكروت
      className="relative group overflow-hidden rounded-3xl border border-slate-800 bg-dark-900 shadow-xl w-75 sm:w-85 mx-auto aspect-square flex flex-col justify-end"
    >
      {feature.imageUrl ? (
        // أضفنا حاوية (Container) بصلاحيات مساحة كاملة مع padding بسيط لتأخذ الصورة راحتها
        <div className="absolute inset-0 p-6 flex items-center justify-center bg-dark-950/60">
          <Image
            src={`${baseUrl}${feature.imageUrl}`}
            alt={feature.title || "Feature Image"}
            fill
            sizes="(max-width: 640px) 300px, 340px"
            quality={90}
            // استبدلنا object-cover بـ object-contain عشان صورة الموبايل تطلع كاملة 100% بدون قص
            className="object-contain object-center group-hover:scale-105 transition-transform duration-500 p-4"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-dark-950 flex items-center justify-center text-slate-600">
          <span>{isAr ? "لا توجد صورة" : "No Image"}</span>
        </div>
      )}

      {/* تدرج الأسود تحت النصوص لضمان وضوحها */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent pointer-events-none" />

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
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
      className="relative group overflow-hidden rounded-3xl border border-slate-800 bg-dark-900 shadow-xl w-75 sm:w-85 mx-auto flex flex-col justify-end p-6"
    >
      {/* عرض الصورة بحجمها الطبيعي وبدون أي إطارات أو قص */}
      <div className="relative w-full my-auto flex items-center justify-center py-4">
        {imageUrl ? (
          <div className="relative w-full">
            <Image
              src={imageUrl}
              alt={feature.title || "Feature Image"}
              width={600}
              height={400}
              quality={90}
              className="w-full h-auto object-contain rounded-xl group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="w-full h-40 flex items-center justify-center text-slate-600">
            <span>{isAr ? "لا توجد صورة" : "No Image"}</span>
          </div>
        )}
      </div>

      {/* تدرج أسود خفيف من تحت لضمان قراءة النصوص بوضوح */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent pointer-events-none" />

      {/* النصوص في أسفل الكرت */}
      <div className="relative z-10 flex flex-col justify-end mt-4">
        <h3 className="font-black text-lg md:text-xl text-white mb-1.5 leading-tight">
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
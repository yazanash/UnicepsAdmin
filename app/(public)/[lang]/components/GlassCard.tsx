"use client";
import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/types/products";

interface GlassCardProps {
  product: ProductType;
  reverse?: boolean;
  lang: string;
  buttonText?: string;
  showButton?: boolean;
}

const GlassCard = ({
  reverse = false,
  product,
  lang,
  buttonText = "",
  showButton = true,
}: GlassCardProps) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const imageSrc = product.heroImage
    ? `${BASE_URL}${product.heroImage}`
    : "/placeholder-app.png";
  const isAr = lang === "ar";

  // اختيار البيانات بناءً على اللغة
  const name = isAr ? product.nameAr : product.name;
  const description = isAr ? product.descriptionAr : product.description;
  return (
    <div
      className="
      relative z-10 mx-auto w-full h-full
      bg-white/5 backdrop-blur-3xl rounded-3xl
      p-6 md:p-12
      grid grid-cols-1 md:grid-cols-2 gap-8
    "
    >
      {/* Text Section */}
      <div
        className={`flex flex-col justify-center h-full text-left md:text-left items-center order-2 ${
          reverse ? "md:order-2" : "md:order-1"
        }`}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {name}
          </h1>

          {/* هنا السر: تحديد أقصى عدد أسطر للنص الوصفي لكي لا يختفي الزر */}
          <p className="text-white/70 text-base md:text-lg mb-2 max-w-md leading-relaxed line-clamp-4 md:line-clamp-6">
            {description}
          </p>
        </div>
          {showButton&& <div className=" w-full flex justify-center">
          <Link href={`/${product.id}`}>
            <button className="px-8 py-4 rounded-2xl bg-linear-to-r from-[#0095A6] to-[#46cdcf] hover:shadow-[0_0_20px_rgba(0,149,166,0.4)] text-white font-bold transition-all duration-300">
              {buttonText}
            </button>
          </Link>
        </div>}
       
      </div>

      {/* Image Section - هنا التغيير لزيادة الحجم */}
      <div
        className={`flex items-center justify-center w-full order-1 ${
          reverse ? "md:order-1" : "md:order-2"
        }`}
      >
        <div
          className="
          relative w-full 
          aspect-square md:h-125
          flex items-center justify-center 
          group
        "
        >
          {/* الحاوية المباشرة للصورة بدون Padding خانق */}
          <div className="relative w-full h-full transform transition-transform duration-700 group-hover:scale-110">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="
                object-contain
                drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassCard;

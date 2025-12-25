"use client";
import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/types/products";
interface GlassCardProps {
  product: ProductType;
  reverse?: boolean;
}
const GlassCard = ({ reverse = false, product }: GlassCardProps) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const imageSrc = product.heroImage
    ? `${BASE_URL}${product.heroImage}`
    : "/placeholder-app.png";
  return (
    <div
      className="
      relative z-10
       mx-auto
       w-full
       h-full
      bg-white/3 backdrop-blur-3xl
      rounded-3xl
      p-10
      grid grid-cols-1 md:grid-cols-2
      gap-10
    "
    >
      {/* Text */}
      <div
        className={`flex flex-col justify-center items-center ${
          reverse ? " md:order-2" : ""
        }`}
      >
        <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
        <p className="text-white/80 mb-6">{product.description}</p>

        <Link href={`/${product.id}`}>
          <button
            className="
          px-6 py-3 rounded-xl
          bg-linear-to-r from-[#0095A6]/80 to-[#46cdcf]/80
          text-white font-bold
        "
          >
            Download App
          </button>
        </Link>
      </div>

      {/* Image */}
      <div
        className={`flex items-center justify-center w-full ${
          reverse ? "md:order-1" : ""
        }`}
      >
        {/* الحاوية الخلفية الملونة - أزلنا الارتفاع الثابت واستخدمنا aspect ratio */}
        <div
          className="
      relative
      w-full 
      aspect-3/4 md:aspect-auto md:h-112.5
      rounded-3xl 
      flex items-center justify-center 
      p-4 md:p-10
      group
    "
        >
          {/* حاوية الصورة المباشرة */}
          <div className="relative w-full h-full">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 90vw, 40vw"
              priority
              className="
          object-contain 
          drop-shadow-[0_20px_50px_rgba(70,205,207,0.3)] 
          transition-transform 
          duration-500 
          group-hover:scale-105
        "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassCard;

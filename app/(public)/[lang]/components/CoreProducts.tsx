"use client";
import { motion } from "framer-motion";
import { PlatformEnum, ProductType } from "@/types/products";
interface CoreProductsProps {
  products: ProductType[];
  content: any;
  lang: string;
}
const CoreProducts = ({ products, content, lang }: CoreProductsProps) => {
  const isAr = lang === "ar";
  return (
    <section className="py-32 px-6 bg-black relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {content.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {content.description}
          </p>
        </motion.div>

        {/* شبكة المنتجات الديناميكية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30, x: index % 2 === 0 ? 20 : -20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              // تمييز الكرت الأوسط أو الثاني بلون مختلف قليلاً
              className={`p-8 rounded-[2.5rem] border backdrop-blur-xl flex flex-col hover:scale-[1.02] transition-all group ${
                index === 1
                  ? "bg-linear-to-b from-[#46cdcf]/10 to-transparent border-[#46cdcf]/20 shadow-[0_0_40px_rgba(70,205,207,0.05)]"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              {/* أيقونة أو لوغو المنتج */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-8 transition-transform group-hover:rotate-12 ${
                  index === 1 ? "bg-[#46cdcf]/20" : "bg-[#0095A6]/20"
                }`}
              >
                {/* يمكنك هنا وضع أيقونة بناءً على نوع المنصة أو imageUrl */}
                {product.platform === PlatformEnum.Mobile ? "📱" : "💻"}
              </div>

              <h3
                className={`text-2xl font-bold mb-4 ${
                  index === 1 ? "text-[#46cdcf]" : "text-white"
                }`}
              >
                {isAr ? product.nameAr : product.name}
              </h3>

              <p className="text-gray-400 mb-8 leading-relaxed line-clamp-3">
                {isAr ? product.descriptionAr : product.description}
              </p>

              <div className="mt-auto pt-6 border-t border-white/5">
                <span className="text-xs font-mono text-[#0095A6] block mb-2 uppercase tracking-widest">
                  Platform:{" "}
                  {product.platform === PlatformEnum.Mobile
                    ? "Mobile"
                    : "Desktop"}
                </span>
                <a
                  href={`/product/${product.id}`}
                  className="text-white text-sm font-bold flex items-center gap-2 group-hover:gap-4 transition-all"
                >
                  {content.action} <span className="text-[#46cdcf]">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreProducts;

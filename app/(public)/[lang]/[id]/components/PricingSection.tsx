import { Plan } from "@/types/plans";
import { Check, ShieldCheck } from "lucide-react";
interface PricingProps {
  pricingPlans: Plan[];
  lang: string;
  dict: any; // نمرر dict.pricing من الصفحة الأب
}
export default function PricingSection({ pricingPlans, lang, dict }: PricingProps) {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* إضاءة خلفية خفيفة خلف الكروت */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-[#0095A6]/10 blur-[120px] rounded-full -z-10" />

      <div className=" mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{dict.pricingTitle}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
           {dict.pricingDesc}
          </p>
        </div>

        <div className="grid grid-cols-1">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.id} 
              className="relative group p-10 bg-white/3 border border-white/10 rounded-[3rem] backdrop-blur-2xl hover:bg-white/5 transition-all duration-500"
            >
              {/* أيقونة مميزة للباقة */}
              <div className="w-12 h-12 bg-[#46cdcf]/20 rounded-2xl flex items-center justify-center mb-8">
                <ShieldCheck className="text-[#46cdcf]" size={28} />
              </div>

              <h3 className="text-3xl font-black text-white mb-2">{plan.name}</h3>
              <p className="text-[#46cdcf] text-sm tracking-[0.2em] uppercase mb-10 font-medium">{dict.availableOptions}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {plan.planItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-6 rounded-4xl bg-black/40 border border-white/5 flex flex-col justify-center"
                  >
                    <span className="text-gray-400 text-xs mb-2 uppercase font-bold tracking-tighter">
                      {item.durationString}
                    </span>
                    <span className="text-3xl font-black text-white">
                      {item.isFree ? (
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#46cdcf] to-white">{dict.free}</span>
                      ) : (
                        `$${item.price}`
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {/* مميزات توضيحية بدلاً من زر الشراء */}
              <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <Check size={16} className="text-[#46cdcf]" />
                 {dict.featureFullAccess}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <Check size={16} className="text-[#46cdcf]" />
                 {dict.featureUpdates}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
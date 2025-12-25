import { motion } from "framer-motion";
import { ChartAreaIcon } from "lucide-react";
import { FeatureType } from "@/types/productFeature";
interface FeatureProps {
  feature: FeatureType;
}
const FeaturesSection = ({ feature }: FeatureProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-8 rounded-4xl bg-white/5 border border-white/10 hover:border-[#46cdcf]/30 transition-all duration-500 group"
    >
      {/* <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
        <ChartAreaIcon className="text-white" />
      </div> */}
      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#46cdcf] transition-colors">
        {feature.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
};

export default FeaturesSection;

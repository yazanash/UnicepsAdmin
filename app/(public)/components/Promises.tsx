"use client"
import { motion } from "framer-motion";
const Promises = () => {
    const promises = [
    {
      title: "الدقة المتناهية",
      desc: "لا مكان للخطأ في الحسابات المالية أو سجلات اللاعبين. نظامنا مصمم ليعمل بدقة 100%.",
      icon: "🎯",
    },
    {
      title: "تجربة مستخدم سلسة",
      desc: "واجهات بسيطة وجميلة تجعل التعامل مع النظام متعة وليس عبئاً إدارياً.",
      icon: "✨",
    },
    {
      title: "دعم فني حقيقي",
      desc: "نحن لسنا مجرد كود برمي، نحن فريق تقني كامل يقف خلفك لضمان نجاح ناديك.",
      icon: "🤝",
    },
    {
      title: "تطور لا يتوقف",
      desc: "تحديثات دورية مجانية تضمن مواكبتك لأحدث تقنيات الإدارة الرياضية العالمية.",
      icon: "🚀",
    },
  ];
  return (
  <section className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* رأس القسم */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl text-right"
          >
            <h2 className="text-[#46cdcf] font-medium mb-4">التزامنا تجاهك</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white">وعودنا التي نبني عليها <span className="text-gray-500">مستقبل Uniceps</span></h3>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-400 max-w-sm text-right"
          >
            نحن نؤمن أن التكنولوجيا يجب أن تخدم الرياضة، لا أن تعقدها. إليك ما نعدك به عند انضمامك إلينا.
          </motion.p>
        </div>

        {/* شبكة الوعود */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {promises.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }} // تأثير التوالي (Stagger)
              className="group"
            >
              <div className="text-3xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-300">
                {p.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[#46cdcf] transition-colors">
                {p.title}
              </h4>
              <p className="text-gray-400 leading-relaxed text-sm">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Promises
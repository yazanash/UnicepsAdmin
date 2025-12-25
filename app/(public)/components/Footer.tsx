import React from 'react'
import { motion } from "framer-motion";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="relative bg-black pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* العمود الأول: الهوية */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Image src="/Logo/Uni-Logo.png" alt="Uniceps" width={40} height={40} />
              <span className="text-2xl font-bold text-white tracking-tighter">Uniceps</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              نظام متكامل لإدارة الأندية الرياضية وتتبع أداء اللاعبين. نوفر لك الأدوات اللازمة للارتقاء بناديك إلى المستوى الرقمي القادم.
            </p>
          </div>

          {/* العمود الثاني: روابط سريعة */}
          <div>
            <h4 className="text-white font-bold mb-6">المنتجات</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-[#46cdcf] transition-colors">تطبيق الموبايل</a></li>
              <li><a href="#" className="hover:text-[#46cdcf] transition-colors">نسخة الديسكتوب Admin</a></li>
              <li><a href="#" className="hover:text-[#46cdcf] transition-colors">نظام ملفات .unx</a></li>
            </ul>
          </div>

          {/* العمود الثالث: الدعم التقني (الذي ركزت عليه) */}
          <div>
            <h4 className="text-white font-bold mb-6">الدعم والمساعدة</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-[#46cdcf] transition-colors">الأسئلة الشائعة</a></li>
              <li><a href="#" className="hover:text-[#46cdcf] transition-colors">سياسة الخصوصية</a></li>
              <li className="pt-2">
                <span className="block text-white mb-2 font-medium">تحتاج مساعدة؟</span>
                <a href="mailto:support@uniceps.com" className="text-[#0095A6] hover:underline">support@uniceps.com</a>
              </li>
            </ul>
          </div>

          {/* العمود الرابع: تواصل مباشر */}
          <div>
            <h4 className="text-white font-bold mb-6">كن على اتصال</h4>
            <p className="text-gray-500 text-sm mb-6">
              تابعنا على منصات التواصل الاجتماعي لتبقى على اطلاع بآخر التحديثات.
            </p>
            <div className="flex gap-4">
              {/* أيقونات افتراضية - يمكنك استبدالها بـ Lucide Icons */}
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0095A6] transition-colors cursor-pointer text-white">FB</div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0095A6] transition-colors cursor-pointer text-white">IG</div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0095A6] transition-colors cursor-pointer text-white">TW</div>
            </div>
          </div>
        </div>

        {/* خط النهاية */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-[12px]">
          <p>© 2025 Uniceps Ecosystem. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6 italic">
            <span>صُنع بشغف لمجتمع الرياضة العربي</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
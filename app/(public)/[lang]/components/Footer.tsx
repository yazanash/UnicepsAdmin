import React from 'react'
import { motion } from "framer-motion";
import Image from "next/image";
import { FaFacebookF,FaInstagram,FaWhatsapp } from 'react-icons/fa';
const Footer = ({ dict }: { dict: any }) => {
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
             {dict.description}
            </p>
          </div>

          {/* العمود الثاني: روابط سريعة */}
          <div>
            <h4 className="text-white font-bold mb-6">{dict.productsTitle}</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
            {dict.products.map((item: string, index: number) => (
                <li key={index}>
                  <a href="#" className="hover:text-[#46cdcf] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود الثالث: الدعم التقني (الذي ركزت عليه) */}
          <div>
            <h4 className="text-white font-bold mb-6">{dict.supportTitle}</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
             {dict.supportLinks.map((link: string, index: number) => (
                <li key={index}>
                  <a href="#" className="hover:text-[#46cdcf] transition-colors">{link}</a>
                </li>
              ))}
              <li className="pt-2">
                <span className="block text-white mb-2 font-medium">{dict.helpText}</span>
                <a href="mailto:support@uniceps.com" className="text-[#0095A6] hover:underline">support@uniceps.com</a>
              </li>
            </ul>
          </div>

          {/* العمود الرابع: تواصل مباشر */}
          <div>
            <h4 className="text-white font-bold mb-6">{dict.socialTitle}</h4>
            <p className="text-gray-500 text-sm mb-6">
           {dict.socialDesc}
            </p>
            <div className="flex gap-4">
              {/* أيقونات افتراضية - يمكنك استبدالها بـ Lucide Icons */}
              <a href='https://www.facebook.com/share/15RvcA5BAxo/' className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0095A6] transition-colors cursor-pointer text-white"><FaFacebookF/></a>
              <a href='https://www.instagram.com/uniceps.app' className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0095A6] transition-colors cursor-pointer text-white"><FaInstagram/></a>
              <a href='' className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0095A6] transition-colors cursor-pointer text-white"><FaWhatsapp/></a>
            </div>
          </div>
        </div>

        {/* خط النهاية */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-[12px]">
          <p>{dict.rights}</p>
          <div className="flex gap-6 italic">
            <span>{dict.passion}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
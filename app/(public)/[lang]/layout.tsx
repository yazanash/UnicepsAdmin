import React from "react";
import Footer from "./components/Footer";
import NavbarGlass from "./components/NavbarGlass";
import { Locale, i18n } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const Publiclayout = async ({ children,params, }: { children: React.ReactNode;params: Promise<{ lang: string }>;}) => {
  const { lang } = await params;
  const currentLang = lang as Locale;
  const dict = await getDictionary(currentLang);
  return (
    <div lang={currentLang} dir={currentLang === "ar" ? "rtl" : "ltr"}>
      <NavbarGlass dict={dict.navbar} lang={lang}/>
      <main className="w-full bg-black">{children}</main>
      <Footer dict={dict.footer}/>
    </div>
  );
};

export default Publiclayout;

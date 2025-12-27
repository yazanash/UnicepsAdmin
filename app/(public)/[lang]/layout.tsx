import React from "react";
import Footer from "./components/Footer";
import NavbarGlass from "./components/NavbarGlass";
import { Locale, i18n } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const Publiclayout = async ({ children,params, }: { children: React.ReactNode;params: Promise<{ lang: Locale }>;}) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <div lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <NavbarGlass dict={dict.navbar} lang={lang}/>
      <main className="w-full bg-black">{children}</main>
      <Footer dict={dict.footer}/>
    </div>
  );
};

export default Publiclayout;

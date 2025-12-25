import React from "react";
import Footer from "./components/Footer";
import NavbarGlass from "./components/NavbarGlass";
const Publiclayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavbarGlass />
      <main className="w-full bg-black">{children}</main>
      <Footer />
    </div>
  );
};

export default Publiclayout;

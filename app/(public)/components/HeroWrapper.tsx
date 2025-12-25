import React from "react";
import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}
const HeroWrapper = ({ children }: WrapperProps) => {
  return (
    <section
      className="
      relative h-screen pt-18 overflow-hidden w-full p-5 sm:p-1
      
    "
    >
      {children}
    </section>
  );
};

export default HeroWrapper;

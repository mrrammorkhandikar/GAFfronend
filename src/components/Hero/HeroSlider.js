'use client';

import React from "react";
import { motion } from "framer-motion";

const logos = [
  { src: "/images/HeroLogo/bosa-charity-img16.png" },
  { src: "/images/HeroLogo/bosa-charity-img17.png" },
  { src: "/images/HeroLogo/bosa-charity-img18.png" },
  { src: "/images/HeroLogo/bosa-charity-img19.png" },
  { src: "/images/HeroLogo/bosa-charity-img15.png" },
];

const HeroSlider = () => {
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="bg-[#fcf9e3] py-12 overflow-hidden">
      <div className="relative flex items-center">
        <motion.div
          className="flex space-x-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 25, // slower for smooth glide
            ease: "linear",
          }}
        >
          {duplicatedLogos.map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center bg-[#FFFBEF] border border-gray-200 rounded-xl shadow-sm w-80 h-40"
            >
              <img
                src={logo.src}
                alt={`logo-${i}`}
                className="w-56 h-28 object-contain opacity-80"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSlider;
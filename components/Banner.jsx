import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-10 md:py-0 bg-[#161925] my-24 rounded-[2.5rem] overflow-hidden relative shadow-2xl group w-full">
      {/* Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-500/15 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Left Image */}
      <div className="md:w-1/3 flex justify-start z-10">
        <Image 
          className="max-w-64 xl:max-w-80 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform -translate-x-4 md:-translate-x-8" 
          src={assets.a2} 
          alt="a2"
          priority 
        />
      </div>
      
      {/* Center Content */}
      <div className="md:w-1/3 flex flex-col items-center justify-center text-center space-y-4 px-4 z-10 mt-6 md:mt-0">
        <h2 className="text-3xl md:text-4xl lg:text-[40px] font-black text-white leading-tight">
          <span className="text-[#FF5722] mb-2 block">ขนมไทย...</span>
          ความสุขเล็กๆ ที่<br className="hidden md:block" />ละลายในปาก
        </h2>
        <p className="max-w-[320px] font-medium text-gray-300/80 leading-snug text-xs lg:text-sm mx-auto">
          ขอเชิญทุกท่านแวะมาเติมความหวาน ด้วยขนมไทยหลากหลายเมนู ห่อด้วยใจ
          ปรุงด้วยความรัก เหมือนคุณยายทำให้ทาน 🍃
        </p>
        <button className="flex items-center justify-center gap-2 px-8 py-3.5 mt-4 bg-gradient-to-r from-[#FF7A00] to-[#FF3B30] rounded-full text-white font-bold text-sm shadow-[0_8px_16px_rgba(255,87,34,0.3)] hover:scale-105 active:scale-95 transition-all duration-300">
          สั่งซื้อเลยวันนี้
          <span className="text-lg leading-none">&rarr;</span>
        </button>
      </div>
      
      {/* Right Image */}
      <div className="md:w-1/3 flex justify-end z-10 md:flex">
        <Image 
          className="max-w-64 xl:max-w-80 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform translate-x-4 md:translate-x-8" 
          src={assets.a1} 
          alt="a1"
          priority 
        />
      </div>
      
      {/* Mobile Right Image (shown at bottom on small screens) */}
      <div className="w-full flex justify-center z-10 mt-10 md:hidden">
        <Image 
          className="max-w-64 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" 
          src={assets.a1} 
          alt="a1"
          priority 
        />
      </div>
    </div>
  );
};

export default Banner;

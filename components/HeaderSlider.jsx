import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title:
        "เป็นขนมไทยโบราณที่นิยมใช้ในงานมงคล เช่น งานบวช งานแต่งงาน งานทำบุญบ้าน",
      offer: "ขนมใส่ไส้",
      buttonText1: "ซื้อเลย",
      buttonText2: "ค้นหาเพิ่มเติม",
      imgSrc: assets.a1,
    },
    {
      id: 2,
      title:
        "เป็นขนมไทยโบราณที่มีความเรียบง่ายแต่แฝงไว้ด้วยรสชาติหวานหอมและความหมายมงคล",
      offer: "ขนมต้ม",
      buttonText1: "Shop Now",
      buttonText2: "ค้นหาเพิ่มเติม",
      imgSrc: assets.a2,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full pt-8 pb-10">
      <div
        className="flex transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-gradient-to-br from-orange-50 via-white to-orange-100/50 py-10 md:py-16 md:px-20 px-6 mt-4 rounded-[2.5rem] min-w-full shadow-[0_20px_50px_-15px_rgba(249,115,22,0.1)] border border-white relative overflow-hidden"
          >
            {/* Background elements */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-red-400/10 rounded-full blur-3xl"></div>

            <div className="md:pr-12 mt-12 md:mt-0 z-10 w-full md:w-1/2 flex flex-col justify-center">
              <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-xs font-black tracking-widest uppercase mb-4 w-fit shadow-sm">
                {slide.offer}
              </span>
              <h1 className="md:text-[44px] md:leading-[1.15] text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 mb-6 drop-shadow-sm">
                {slide.title}
              </h1>
              <div className="flex flex-wrap items-center mt-4 md:mt-8 gap-4">
                <button className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl text-white font-black uppercase tracking-wider text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center gap-2 px-8 py-3.5 font-black uppercase tracking-wider text-sm text-gray-700 bg-white border border-gray-200 rounded-2xl hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 shadow-sm hover:shadow-md">
                  {slide.buttonText2}
                  <Image
                    className="group-hover:translate-x-1.5 transition-transform duration-300 opacity-70 group-hover:opacity-100"
                    src={assets.arrow_icon}
                    alt="arrow_icon"
                  />
                </button>
              </div>
            </div>
            
            <div className="flex items-center flex-1 justify-center z-10 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-300/20 to-transparent rounded-full blur-2xl transform group-hover:scale-110 transition-transform duration-700"></div>
              <Image
                className="md:w-96 w-64 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] transform group-hover:scale-105 group-hover:-rotate-2 transition-all duration-700 relative z-10"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 mt-8 absolute bottom-14 left-1/2 -translate-x-1/2 z-20">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index ? "w-8 bg-orange-600 shadow-md shadow-orange-500/40" : "w-2.5 bg-gray-300 hover:bg-orange-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;

import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const products = [
  {
    id: 1,
    image: assets.b1,
    title: "ขนมต้ม",
    description:
      "เป็นขนมไทยโบราณที่นิยมใช้ในงานมงคล เช่น งานบวช งานแต่งงาน งานทำบุญบ้าน",
  },
  // {
  //   id: 2,
  //   image: assets.girl_with_earphone_image,
  //   title: "Stay Connected",
  //   description: "Compact and stylish earphones for every occasion.",
  // },
  // {
  //   id: 3,
  //   image: assets.boy_with_laptop_image,
  //   title: "Power in Every Pixel",
  //   description: "Shop the latest laptops for work, gaming, and more.",
  // },
];

const FeaturedProduct = () => {
  return (
    <div className="pt-16 pb-20">
      <div className="flex flex-col items-center mb-16 text-center">
        <span className="text-orange-600 font-black tracking-widest text-xs uppercase mb-3 block bg-orange-50 px-4 py-1.5 rounded-full">แนะนำ</span>
        <h2 className="text-4xl font-black text-gray-900 tracking-tight">สินค้าเด่นประจำสัปดาห์ 🌟</h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-orange-500 to-red-500 mt-6 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 px-4 md:px-0">
        {products.map(({ id, image, title, description }) => (
          <div key={id} className="relative group rounded-[2rem] overflow-hidden shadow-sm hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)] transition-all duration-500 cursor-pointer">
            {/* Image with zoom effect */}
            <div className="aspect-[4/5] w-full overflow-hidden bg-gray-100">
              <Image
                src={image}
                alt={title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              />
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
            
            {/* Content Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white z-10">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <p className="font-black text-2xl lg:text-3xl mb-2 drop-shadow-md">{title}</p>
                <p className="text-gray-200 text-sm leading-relaxed mb-6 max-w-[90%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {description}
                </p>
                
                <button className="flex items-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg w-fit">
                  ซื้อเลย
                  <Image
                    className="h-3 w-3 transition-transform group-hover:translate-x-1"
                    src={assets.redirect_icon}
                    alt="Redirect Icon"
                    style={{ filter: 'brightness(0)' }}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;

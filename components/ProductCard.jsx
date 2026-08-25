import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, router } = useAppContext();

  return (
    <div
      onClick={() => {
        router.push("/product/" + product._id);
        scrollTo(0, 0);
      }}
      className="group flex flex-col items-start gap-0.5 w-full cursor-pointer bg-white rounded-2xl p-3 md:p-4 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(255,100,0,0.15)] hover:-translate-y-2 transition-all duration-300 border border-gray-50 hover:border-orange-100"
    >
      <div className="relative bg-gray-50/50 rounded-xl w-full aspect-square flex items-center justify-center overflow-hidden mb-3">
        <Image
          src={product.image[0]}
          alt={product.name}
          className="group-hover:scale-110 transition-transform duration-500 object-cover w-full h-full mix-blend-multiply"
          width={800}
          height={800}
        />
        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        
        <button className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full shadow-md hover:bg-orange-50 hover:scale-110 transition-all z-10 active:scale-95">
          <Image className="h-3.5 w-3.5 opacity-70" src={assets.heart_icon} alt="heart_icon" />
        </button>
      </div>

      <p className="md:text-base text-sm font-black text-gray-800 w-full truncate group-hover:text-orange-600 transition-colors">
        {product.name}
      </p>
      <p className="w-full text-xs text-gray-400 line-clamp-1 max-sm:hidden leading-relaxed">
        {product.description}
      </p>
      
      <div className="flex items-center gap-2 mt-1">
        <p className="text-xs font-bold text-orange-500">{4.5}</p>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Image
              key={index}
              className="h-2.5 w-2.5"
              src={
                index < Math.floor(4) ? assets.star_icon : assets.star_dull_icon
              }
              alt="star_icon"
            />
          ))}
        </div>
      </div>

      <div className="flex items-end justify-between w-full mt-3 pt-3 border-t border-gray-100">
        <p className="text-lg font-black text-gray-900 tracking-tight">
          <span className="text-xs font-medium text-gray-400 mr-0.5">฿</span>{product.offerPrice}
        </p>
        <button className="max-sm:hidden px-4 py-1.5 bg-gray-50 text-gray-600 font-bold rounded-xl text-[11px] group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-orange-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-orange-200 uppercase tracking-wider">
          ซื้อเลย
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

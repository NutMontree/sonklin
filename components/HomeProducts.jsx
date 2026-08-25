import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {
  const { products, router } = useAppContext();

    <div className="flex flex-col items-center pt-24 pb-10">
      <div className="w-full flex justify-between items-end mb-10">
        <div>
          <span className="text-orange-600 font-black tracking-widest text-xs uppercase mb-2 block">ยอดฮิต</span>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">สินค้ายอดนิยม 🔥</h2>
        </div>
        <button
          onClick={() => router.push("/all-products")}
          className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-orange-600 transition-colors group"
        >
          ดูทั้งหมด
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 xl:gap-8 pb-14 w-full">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      
      <button
        onClick={() => router.push("/all-products")}
        className="md:hidden px-10 py-3.5 bg-gray-900 text-white rounded-2xl font-black text-sm w-full shadow-lg shadow-gray-900/20 active:scale-95 transition-all"
      >
        ดูสินค้าทั้งหมด
      </button>
    </div>
};

export default HomeProducts;

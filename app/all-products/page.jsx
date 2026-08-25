"use client";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const AllProducts = () => {
  const { products } = useAppContext();

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-32 bg-gray-50/30 min-h-screen">
        <div className="flex flex-col items-center pt-14 pb-8 w-full">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight text-center mb-3">
            ผลิตภัณฑ์<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">ทั้งหมด</span>
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
          <p className="text-gray-500 mt-4 text-center max-w-2xl text-sm md:text-base">
            เลือกซื้อขนมไทยสูตรต้นตำรับ และสินค้าคุณภาพระดับพรีเมียมที่เราคัดสรรมาเพื่อคุณโดยเฉพาะ
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 md:gap-6 mt-6 pb-20 w-full">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;

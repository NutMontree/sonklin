"use client";
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const ProductList = () => {
  const { router, getToken, user } = useAppContext();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📦 ดึงรายการสินค้าของผู้ขาย
  const fetchSellerProduct = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/product/seller-list", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSellerProduct();
    }
  }, [user]);

  // ✏️ ฟังก์ชันเปิดหน้าแก้ไขสินค้า
  const handleEditProduct = (productId) => {
    router.push(`/seller/edit-product/${productId}`);
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full md:p-10 p-6 bg-gray-50/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 max-w-6xl mx-auto gap-4">
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">คลังสินค้าทั้งหมด</h2>
              <p className="text-sm font-medium text-gray-500 mt-1">จัดการแก้ไข ข้อมูลและราคาของสินค้าทั้งหมดในระบบ</p>
            </div>
            <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-xl text-sm font-black shadow-sm w-max">
              รวม {products.length} รายการ
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-gray-100">
            
            {/* Desktop View: Table */}
            <div className="hidden md:block overflow-x-auto">
            <table className="table-fixed w-full overflow-hidden text-left">
              <thead className="bg-gray-900 text-white text-xs uppercase tracking-widest font-black">
                <tr>
                  <th className="w-2/5 px-8 py-5 truncate rounded-tl-[2rem]">
                    ผลิตภัณฑ์
                  </th>
                  <th className="px-6 py-5 truncate max-sm:hidden">
                    ประเภท
                  </th>
                  <th className="px-6 py-5 truncate">ราคาขาย</th>
                  <th className="px-6 py-5 truncate max-sm:hidden text-center">
                    ดูหน้าร้าน
                  </th>
                  <th className="px-8 py-5 truncate text-right rounded-tr-[2rem]">จัดการ</th>
                </tr>
              </thead>

              <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                {products.map((product, index) => (
                  <tr
                    key={index}
                    className="hover:bg-orange-50/30 transition-colors group"
                  >
                    {/* 📦 ชื่อสินค้า + รูป */}
                    <td className="px-8 py-4 flex items-center space-x-4 truncate">
                      <div className="w-14 h-14 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shadow-sm group-hover:border-orange-200 transition-colors">
                        <Image
                          src={product.image[0]}
                          alt="ภาพสินค้า"
                          className="object-cover w-full h-full"
                          width={80}
                          height={80}
                        />
                      </div>
                      <span className="font-bold text-gray-800 truncate w-full group-hover:text-orange-600 transition-colors">{product.name}</span>
                    </td>

                    {/* ประเภทสินค้า */}
                    <td className="px-6 py-4 max-sm:hidden">
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-[11px] font-bold">
                        {product.category}
                      </span>
                    </td>

                    {/* ราคา */}
                    <td className="px-6 py-4 font-black text-gray-900">฿{product.offerPrice}</td>

                    {/* ปุ่ม Visit */}
                    <td className="px-6 py-4 max-sm:hidden text-center">
                      <button
                        onClick={() => router.push(`/product/${product._id}`)}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white rounded-xl text-xs font-bold transition-all shadow-sm group/btn"
                      >
                        ดูสินค้า
                        <Image
                          className="h-3 w-3 opacity-60 group-hover/btn:opacity-100 group-hover/btn:invert transition-all"
                          src={assets.redirect_icon}
                          alt="redirect_icon"
                        />
                      </button>
                    </td>

                    {/* ✏️ ปุ่มแก้ไข */}
                    <td className="px-8 py-4 text-right">
                      <button
                        onClick={() => handleEditProduct(product._id)}
                        className="px-6 py-2 bg-white border border-gray-200 hover:border-orange-500 hover:bg-orange-50 text-gray-700 hover:text-orange-600 rounded-xl text-xs font-black transition-all shadow-sm active:scale-95"
                      >
                        แก้ไข
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>

            {/* Mobile View: Cards */}
            <div className="md:hidden flex flex-col divide-y divide-gray-100">
              {products.map((product, index) => (
                <div key={index} className="p-5 flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div className="relative w-20 h-20 shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                      <Image
                        src={product.image[0]}
                        alt={product.name}
                        className="object-cover w-full h-full"
                        width={80}
                        height={80}
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-1 overflow-hidden">
                      <div>
                        <p className="font-bold text-gray-800 leading-tight truncate">{product.name}</p>
                        <p className="text-sm font-black text-orange-600 mt-1">฿{product.offerPrice}</p>
                      </div>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-[10px] font-bold w-max">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/product/${product._id}`)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
                    >
                      ดูสินค้า
                    </button>
                    <button
                      onClick={() => handleEditProduct(product._id)}
                      className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-black shadow-sm"
                    >
                      แก้ไข
                    </button>
                  </div>
                </div>
              ))}
              
              {products.length === 0 && (
                <div className="py-16 text-center text-gray-400 font-medium">
                  ไม่มีสินค้าในระบบ
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductList;

"use client";
import React from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";

const Cart = () => {
  const {
    products,
    router,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
  } = useAppContext();

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-14 mb-20 bg-gray-50/30 min-h-screen">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">ตะกร้าสินค้า</span> ของคุณ
            </h1>
            <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-xl text-sm font-black shadow-sm">
              {getCartCount()} ชิ้น
            </div>
          </div>
          
          <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
            
            {/* Desktop View: Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50/80 text-left border-b border-gray-100">
                  <tr>
                    <th className="text-nowrap py-5 px-8 text-gray-400 font-black text-xs uppercase tracking-widest">
                      รายละเอียดสินค้า
                    </th>
                    <th className="py-5 px-6 text-gray-400 font-black text-xs uppercase tracking-widest text-center">
                      ราคา
                    </th>
                    <th className="py-5 px-6 text-gray-400 font-black text-xs uppercase tracking-widest text-center">
                      จำนวน
                    </th>
                    <th className="py-5 px-8 text-gray-400 font-black text-xs uppercase tracking-widest text-right">
                      ยอดรวม
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {Object.keys(cartItems).map((itemId) => {
                    const product = products.find(
                      (product) => product._id === itemId
                    );

                    if (!product || cartItems[itemId] <= 0) return null;

                    return (
                      <tr key={itemId} className="hover:bg-orange-50/20 transition-colors group">
                        <td className="flex items-center gap-5 py-6 px-8">
                          <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 group-hover:border-orange-200 transition-colors shadow-sm">
                            <Image
                              src={product.image[0]}
                              alt={product.name}
                              className="w-full h-full object-cover mix-blend-multiply"
                              width={1280}
                              height={720}
                            />
                          </div>
                          <div>
                            <p className="text-base font-bold text-gray-800 group-hover:text-orange-600 transition-colors">{product.name}</p>
                            <button
                              className="text-xs font-bold text-red-400 hover:text-red-600 mt-2 flex items-center gap-1 transition-colors"
                              onClick={() => updateCartQuantity(product._id, 0)}
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              ลบออก
                            </button>
                          </div>
                        </td>
                        <td className="py-6 px-6 text-center">
                          <span className="text-sm font-bold text-gray-600">฿{product.offerPrice}</span>
                        </td>
                        <td className="py-6 px-6">
                          <div className="flex items-center justify-center gap-2 bg-gray-50 rounded-xl p-1 border border-gray-100 w-max mx-auto shadow-inner">
                            <button
                              className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-orange-600 hover:shadow transition-all active:scale-95 text-gray-500 font-bold"
                              onClick={() =>
                                updateCartQuantity(
                                  product._id,
                                  cartItems[itemId] - 1
                                )
                              }
                            >
                              -
                            </button>
                            <input
                              onChange={(e) =>
                                updateCartQuantity(
                                  product._id,
                                  Number(e.target.value)
                                )
                              }
                              type="number"
                              value={cartItems[itemId]}
                              className="w-10 bg-transparent text-center text-sm font-bold text-gray-800 outline-none appearance-none"
                            />
                            <button 
                              className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-orange-600 hover:shadow transition-all active:scale-95 text-gray-500 font-bold"
                              onClick={() => addToCart(product._id)}>
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-6 px-8 text-right">
                          <span className="text-base font-black text-gray-900">
                            ฿{(product.offerPrice * cartItems[itemId]).toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile View: Cards */}
            <div className="md:hidden flex flex-col divide-y divide-gray-100">
              {Object.keys(cartItems).map((itemId) => {
                const product = products.find(
                  (product) => product._id === itemId
                );

                if (!product || cartItems[itemId] <= 0) return null;

                return (
                  <div key={itemId} className="p-5 flex flex-col gap-4">
                    <div className="flex gap-4">
                      <div className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
                        <Image
                          src={product.image[0]}
                          alt={product.name}
                          className="w-full h-full object-cover mix-blend-multiply"
                          width={1280}
                          height={720}
                        />
                      </div>
                      <div className="flex flex-col justify-between flex-1">
                        <div>
                          <p className="text-sm font-bold text-gray-800 leading-tight">{product.name}</p>
                          <p className="text-sm font-bold text-orange-600 mt-1">฿{product.offerPrice}</p>
                        </div>
                        <button
                          className="text-xs font-bold text-red-400 hover:text-red-600 flex items-center gap-1 w-max"
                          onClick={() => updateCartQuantity(product._id, 0)}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          ลบออก
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border border-gray-100">
                        <button
                          className="w-7 h-7 flex items-center justify-center bg-gray-50 rounded hover:text-orange-600 active:scale-95 text-gray-500 font-bold"
                          onClick={() => updateCartQuantity(product._id, cartItems[itemId] - 1)}
                        >
                          -
                        </button>
                        <input
                          onChange={(e) => updateCartQuantity(product._id, Number(e.target.value))}
                          type="number"
                          value={cartItems[itemId]}
                          className="w-8 bg-transparent text-center text-sm font-bold text-gray-800 outline-none appearance-none"
                        />
                        <button 
                          className="w-7 h-7 flex items-center justify-center bg-gray-50 rounded hover:text-orange-600 active:scale-95 text-gray-500 font-bold"
                          onClick={() => addToCart(product._id)}>
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-gray-400 uppercase">ยอดรวม</p>
                        <p className="text-base font-black text-gray-900">
                          ฿{(product.offerPrice * cartItems[itemId]).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {Object.keys(cartItems).filter(id => cartItems[id] > 0).length === 0 && (
                <div className="py-16 text-center">
                  <p className="text-gray-400 font-medium">ไม่มีสินค้าในตะกร้า</p>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={() => router.push("/all-products")}
            className="group inline-flex items-center mt-8 gap-2 px-6 py-3 bg-white border-2 border-orange-100 text-orange-600 font-bold rounded-xl shadow-sm hover:bg-orange-50 hover:border-orange-200 hover:shadow-md transition-all active:scale-95"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            เลือกซื้อสินค้าต่อ
          </button>
        </div>
        <OrderSummary />
      </div>
    </>
  );
};

export default Cart;

import React from "react";

const NewsLetter = () => {
  return (
    <div className="relative py-20 my-10 overflow-hidden rounded-[3rem]">
      {/* Background with blur */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-red-50 z-0"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-400/20 rounded-full blur-[100px] z-0"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-400/20 rounded-full blur-[100px] z-0"></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-6">
        <div className="inline-block mb-6 px-6 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white shadow-sm">
          <span className="text-orange-600 font-black tracking-widest text-xs uppercase">โปรโมชั่นพิเศษ</span>
        </div>
        
        <h1 className="md:text-5xl text-3xl font-black text-gray-900 mb-6 leading-tight tracking-tight drop-shadow-sm">
          🎉 สั่งวันนี้ <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">ลดทันที 20%</span>
        </h1>
        
        <p className="md:text-lg text-gray-600 mb-10 leading-relaxed font-medium bg-white/40 p-6 rounded-3xl backdrop-blur-sm border border-white/50 shadow-sm">
          ขนมไทยโบราณ หวานหอม สดใหม่ทุกวัน <br />
          📦 ส่งตรงถึงหน้าบ้าน สะดวก อร่อย ฟิน! <br />
          <span className="text-orange-600 font-bold">💥 โปรโมชั่นนี้มีถึงสิ้นเดือนเท่านั้น!</span> <br />
          <span className="text-xs text-gray-400 mt-4 block">#ขนมไทยลดราคา #โปรขนมไทย #ของหวานออนไลน์</span>
        </p>

        <button className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-gray-900/20 hover:bg-gray-800 hover:-translate-y-1 hover:shadow-gray-900/30 active:translate-y-0 transition-all duration-300">
          ดูสินค้าโปรโมชั่น
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;

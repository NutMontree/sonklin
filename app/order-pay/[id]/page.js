"use client";
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import toast from "react-hot-toast";

const OrderPay = ({ params }) => {
  const lineId = "kung080323582";

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("4402927080");
    toast.success("คัดลอกเลขบัญชีแล้ว");
  };

  const handleUploadSlip = async () => {
    if (!file) {
      toast.error("กรุณาเลือกรูปสลิปก่อนครับ");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("orderId", params.id);
      formData.append("image", file);

      // We need to pass auth token, but getAuth is server-side.
      // Wait, let's import useAppContext to get token.
      
      const response = await fetch("/api/order/upload-slip", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        toast.success("อัปโหลดสลิปสำเร็จ ทางร้านจะตรวจสอบให้เร็วที่สุด");
        setTimeout(() => {
          window.location.href = "/my-orders";
        }, 2000);
      } else {
        toast.error(data.message || "อัปโหลดล้มเหลว");
      }
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการอัปโหลด");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white/50 p-8 text-center relative overflow-hidden">
        {/* Decorative background blurs */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-green-500/10 to-transparent -z-10" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-green-500/20 rounded-full blur-3xl -z-10" />

        <div className="mb-6 relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-[bounce_2s_infinite]">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-2">
          คำสั่งซื้อสำเร็จ!
        </h2>
        <p className="text-gray-500 mb-8 text-sm font-medium">
          กรุณาชำระเงินเพื่อยืนยันออเดอร์ของคุณ
        </p>

        {/* บัญชีธนาคาร */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 p-6 rounded-3xl border border-gray-200/60 mb-8 text-left relative overflow-hidden group hover:border-blue-200 transition-colors duration-300">
          <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
          
          <p className="text-[11px] font-black tracking-widest text-gray-400 uppercase mb-4">
            บัญชีโอนเงินของทางร้าน
          </p>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 bg-gradient-to-br from-[#4e2a84] to-[#3a1b66] rounded-2xl flex items-center justify-center shadow-lg shadow-purple-900/20 transform group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-xl">SCB</span>
            </div>
            <div>
              <p className="font-black text-gray-800 text-lg">ธนาคารไทยพาณิชย์</p>
              <p className="text-sm text-gray-500 font-medium mt-0.5">คุณ ปานปรียา พรหมชา</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center group/copy hover:shadow-md transition-all">
            <span className="text-xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              4402927080
            </span>
            <button
              onClick={copyToClipboard}
              className="text-xs font-bold bg-blue-50 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-100 hover:scale-105 transition-all active:scale-95"
            >
              คัดลอก
            </button>
          </div>
        </div>

        <div className="space-y-5">
          {/* ส่วนแนบสลิป */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-left group">
            <p className="text-sm font-black text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              อัปโหลดหลักฐานการโอน
            </p>
            
            <div className="relative">
              <input 
                type="file" 
                id="slip-upload"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
              <label 
                htmlFor="slip-upload"
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
                  file ? 'border-blue-400 bg-blue-50/50' : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 bg-gray-50/50'
                }`}
              >
                {file ? (
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2 text-blue-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-xs font-bold text-blue-600 truncate max-w-[200px]">{file.name}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-gray-400 group-hover:text-blue-500 transition-colors">
                    <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                    <span className="text-xs font-bold">แตะเพื่อเลือกรูปสลิป</span>
                  </div>
                )}
              </label>
            </div>

            <button
              onClick={handleUploadSlip}
              disabled={uploading || !file}
              className={`mt-4 w-full py-3.5 text-[13px] text-white font-black uppercase tracking-wider rounded-2xl transition-all duration-300 flex justify-center items-center gap-2 ${
                uploading || !file 
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0"
              }`}
            >
              {uploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  กำลังอัปโหลด...
                </>
              ) : "ยืนยันการโอนเงิน"}
            </button>
          </div>

          <div className="flex items-center gap-4 py-2">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-gray-200 flex-1"></div>
            <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">หรือ</span>
            <div className="h-px bg-gradient-to-l from-transparent via-gray-200 to-gray-200 flex-1"></div>
          </div>

          {/* ปุ่มแจ้งโอนผ่าน LINE */}
          <button
            onClick={() =>
              window.open(`https://line.me/ti/p/~${lineId}`, "_blank")
            }
            className="w-full py-3.5 bg-gradient-to-r from-[#00c300] to-[#00e000] text-white rounded-2xl font-black uppercase tracking-wider text-[13px] flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 3.55 8.845 8.365 9.589.327.071.77.218.882.502.1.252.032.642.016.892-.02.327-.128 1.554-.156 1.879-.036.417.185.512.448.337.264-.176 1.636-1.127 2.924-2.126 1.18-.916 2.39-1.921 2.39-1.921 1.02.213 2.083.327 3.167.327 6.617 0 12-4.37 12-9.738z"/></svg>
            แจ้งโอนผ่าน LINE
          </button>

          {/* ปุ่มไปหน้าดูออเดอร์ */}
          <button
            onClick={() => (window.location.href = "/my-orders")}
            className="w-full py-3 text-gray-400 hover:text-gray-700 font-bold text-[13px] transition-colors"
          >
            ไว้แจ้งทีหลัง (ไปหน้าออเดอร์ของฉัน)
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPay;

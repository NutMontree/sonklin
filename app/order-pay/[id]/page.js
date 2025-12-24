"use client";
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import toast from "react-hot-toast";

const OrderPay = ({ params }) => {
  const lineId = "kung080323582";

  const copyToClipboard = () => {
    navigator.clipboard.writeText("1234567890");
    toast.success("คัดลอกเลขบัญชีแล้ว");
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-100 text-center">
      <div className="mb-4 text-green-500">
        <svg
          className="w-16 h-16 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-gray-800">คำสั่งซื้อสำเร็จ!</h2>
      <p className="text-gray-500 mb-6 text-sm">
        กรุณาโอนเงินเพื่อยืนยันออเดอร์ของคุณ
      </p>

      {/* บัญชีธนาคาร */}
      <div className="bg-gray-50 p-5 rounded-xl border border-dashed border-gray-300 mb-6 text-left">
        <p className="tex-xs text-gray-400 uppercase mb-2">
          บัญชีสำหรับโอนเงิน
        </p>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-[#00666a] rounded-lg flex items-center justify-center text-white font-bold">
            SCB
          </div>
          <div>
            <p className="font-bold text-gray-800">ธนาคารไทยพาณิชย์</p>
            <p className="text-sm">ชื่อบัญชี: ปานปรียา พรหมชา</p>
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg border flex justify-between items-center">
          <span className="text-lg font-mono font-bold text-blue-600">
            4402927080
          </span>
          <button
            onClick={copyToClipboard}
            className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
          >
            คัดลอก
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {/* ปุ่มแจ้งโอนผ่าน LINE - แก้ไขลิงก์ที่นี่ */}
        <button
          onClick={() =>
            window.open(`https://line.me/ti/p/~${lineId}`, "_blank")
          }
          className="w-full py-3 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
        >
          {/* สามารถใส่ Icon Line เพิ่มเติมได้ที่นี่ */}
          แจ้งโอนเงินผ่าน LINE
        </button>

        {/* ปุ่มไปหน้าดูออเดอร์ */}
        <button
          onClick={() => (window.location.href = "/my-orders")}
          className="w-full py-3 text-gray-400 hover:text-gray-600 font-medium text-sm transition-colors"
        >
          ไว้แจ้งทีหลัง (ไปหน้าออเดอร์ของฉัน)
        </button>
      </div>
    </div>
  );
};

export default OrderPay;

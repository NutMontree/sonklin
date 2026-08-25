"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message || "ส่งข้อความเรียบร้อย!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.message || "เกิดข้อผิดพลาด");
      }
    } catch (error: any) {
      toast.error(error.message || "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row bg-gray-50/50">
        {/* ส่วนซ้าย - ข้อมูลติดต่อ */}
        <div className="relative md:w-5/12 bg-gray-900 text-white p-10 lg:p-16 flex flex-col justify-center items-start overflow-hidden">
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>

          <div className="relative z-10 w-full max-w-md mx-auto md:mx-0">
            <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mb-6"></div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              ติดต่อเรา
            </h1>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-10">
              เรายินดีรับฟังทุกความคิดเห็นและข้อเสนอแนะของคุณ
              เพื่อนำไปพัฒนาการบริการให้ดียิ่งขึ้น กรุณากรอกแบบฟอร์มด้านข้าง
              แล้วทีมงานของเราจะรีบติดต่อกลับโดยเร็วที่สุด
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                  <span className="text-xl">📍</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    ที่อยู่
                  </p>
                  <p className="text-sm font-medium text-gray-100 mt-1">
                    ร้านซ่อนกลิ่น Kantharalak, Sisaket, Thailand
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                  <span className="text-xl">📞</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    เบอร์โทรศัพท์
                  </p>
                  <p className="text-sm font-medium text-gray-100 mt-1">
                    080-323-5682
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                  <span className="text-xl">✉️</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    อีเมล
                  </p>
                  <p className="text-sm font-medium text-gray-100 mt-1">
                    nutmontree29@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* 🔙 ปุ่มย้อนกลับ */}
            <button
              onClick={() => router.push("/")}
              className="group flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold transition-all backdrop-blur-sm"
            >
              <svg
                className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              กลับหน้าหลัก
            </button>
          </div>
        </div>

        {/* ส่วนขวา - ฟอร์ม */}
        <div className="md:w-7/12 p-6 md:p-10 lg:p-16 flex justify-center items-center relative">
          <form
            className="w-full max-w-xl bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-gray-100 space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                ส่งข้อความถึงเรา ✨
              </h2>
              <p className="text-sm font-medium text-gray-500 mt-2">
                กรุณากรอกข้อมูลให้ครบถ้วนเพื่อให้เราติดต่อกลับได้สะดวกยิ่งขึ้น
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                  ชื่อของคุณ
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="เช่น สมชาย ใจดี"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange-500 rounded-xl outline-none text-sm font-medium transition-all"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                  อีเมล
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange-500 rounded-xl outline-none text-sm font-medium transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                หัวข้อเรื่อง
              </label>
              <input
                type="text"
                name="subject"
                placeholder="เช่น สอบถามเรื่องสินค้า"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3.5 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange-500 rounded-xl outline-none text-sm font-medium transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                ข้อความ
              </label>
              <textarea
                name="message"
                placeholder="พิมพ์ข้อความของคุณที่นี่..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3.5 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange-500 rounded-xl outline-none text-sm font-medium transition-all resize-none h-36"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 mt-2 rounded-xl text-white font-black uppercase tracking-widest text-sm shadow-xl transition-all active:scale-[0.98] ${
                loading
                  ? "bg-gray-400 shadow-none cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5"
              }`}
            >
              {loading ? "กำลังส่ง..." : "ส่งข้อความ"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;

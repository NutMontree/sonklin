"use client";
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import axios from "axios";

const SellerOrders = () => {
  const { currency, getToken } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // ดึงข้อมูลทั้งหมด
  const fetchOrders = async (isManual = false) => {
    try {
      if (isManual) setRefreshing(true);
      else setLoading(true);

      const token = await getToken();
      const { data } = await axios.get("/api/order/seller-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setOrders(data.orders.reverse());
        if (isManual) toast.success("อัปเดตข้อมูลล่าสุดแล้ว");
      }
    } catch (error) {
      toast.error("ไม่สามารถดึงข้อมูลได้");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ฟังก์ชันไฮไลท์: อัปเดตสถานะเงิน (Payment)
  const updatePaymentStatus = async (orderId, isPaid) => {
    try {
      // ขั้นที่ 1: เปลี่ยนสถานะที่หน้าจอทันที (Optimistic Update)
      // วิธีนี้จะทำให้ Header เปลี่ยนสีเขียว/แดง ทันทีที่นิ้วสัมผัสปุ่ม
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, payment: isPaid } : order
        )
      );

      const token = await getToken();
      const { data } = await axios.post(
        "/api/order/update-payment",
        { orderId, payment: isPaid },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(isPaid ? "ยืนยันรับเงินแล้ว" : "เปลี่ยนเป็นยังไม่ชำระ");
      } else {
        fetchOrders(); // ถ้าหลังบ้านพลาด ให้ดึงค่าจริงกลับมา
      }
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด");
      fetchOrders();
    }
  };

  // อัปเดตสถานะขนส่ง
  const updateDeliveryStatus = async (e, orderId) => {
    const newStatus = e.target.value;
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/order/status",
        { orderId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
        toast.success("อัปเดตสถานะขนส่งแล้ว");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-4 md:p-10 bg-[#fbfbfb] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Main Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              จัดการคำสั่งซื้อ
            </h2>
            <p className="text-gray-500 mt-1">
              ตรวจสอบการชำระเงินและสถานะขนส่ง
            </p>
          </div>
          <button
            onClick={() => fetchOrders(true)}
            disabled={refreshing}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            <svg
              className={`w-4 h-4 text-blue-600 ${
                refreshing ? "animate-spin" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="text-xs font-bold text-gray-700">
              {refreshing ? "กำลังอัปเดต..." : "รีเฟรช"}
            </span>
          </button>
        </div>

        <div className="grid gap-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] overflow-hidden"
            >
              {/* Order Card Header - สถานะตรงนี้จะเปลี่ยนตามปุ่มกด */}
              <div className="bg-gray-50/80 px-8 py-4 border-b border-gray-100 flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm text-[10px] font-black">
                    #{order._id.slice(-8).toUpperCase()}
                  </div>

                  {/* สถานะเงินเข้า (Badge) */}
                  <span
                    className={`text-[10px] px-3 py-1 rounded-full font-black tracking-widest uppercase transition-colors duration-300 ${
                      order.payment
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-red-100 text-red-700 border border-red-200"
                    }`}
                  >
                    {order.payment
                      ? "● ชำระเงินเรียบร้อย"
                      : "○ ยังไม่ได้รับเงิน"}
                  </span>

                  <span className="text-[10px] font-bold text-gray-300 uppercase italic">
                    {order.paymentMethod}
                  </span>
                </div>
                <span className="text-xs font-bold text-gray-400">
                  {new Date(order.date).toLocaleString("th-TH")}
                </span>
              </div>

              <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* 1. ข้อมูลสินค้า */}
                <div className="lg:col-span-4">
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">
                    รายการสินค้า
                  </h4>
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                          <Image
                            src={assets.box_icon}
                            alt="box"
                            className="w-5 h-5 opacity-40"
                          />
                        </div>
                        <p className="text-sm font-bold text-gray-800 leading-tight">
                          {item.product.name}{" "}
                          <span className="text-orange-500 ml-1">
                            x{item.quantity}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-50">
                    <p className="text-2xl font-black text-gray-900 tracking-tighter">
                      <span className="text-sm font-medium mr-1">
                        {currency}
                      </span>
                      {order.amount.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* 2. ส่วนควบคุมสถานะเงินเข้า (Payment Status Control) */}
                <div className="lg:col-span-4 lg:border-x lg:border-gray-50 lg:px-10">
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">
                    ข้อมูลลูกค้า
                  </h4>
                  <div className="mb-6 bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                    <p className="text-sm font-black text-gray-900">
                      {order.address.fullName}
                    </p>
                    <p className="text-xs text-blue-600 font-bold mt-1">
                      📞 {order.address.phoneNumber}
                    </p>
                  </div>

                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-3 text-center tracking-widest">
                    ยืนยันสถานะเงินเข้า
                  </p>
                  <div className="flex p-1 bg-gray-100 rounded-2xl">
                    <button
                      onClick={() => updatePaymentStatus(order._id, true)}
                      className={`flex-1 py-2.5 rounded-xl text-[11px] font-black transition-all ${
                        order.payment
                          ? "bg-white text-green-600 shadow-sm scale-105"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      ชำระแล้ว
                    </button>
                    <button
                      onClick={() => updatePaymentStatus(order._id, false)}
                      className={`flex-1 py-2.5 rounded-xl text-[11px] font-black transition-all ${
                        !order.payment
                          ? "bg-white text-red-500 shadow-sm scale-105"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      ยังไม่ชำระ
                    </button>
                  </div>
                </div>

                {/* 3. ส่วนควบคุมการจัดส่ง */}
                <div className="lg:col-span-4">
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">
                    สถานะการจัดส่ง
                  </h4>
                  <div className="space-y-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateDeliveryStatus(e, order._id)}
                      className={`w-full p-4 rounded-2xl text-xs font-black border-2 transition-all outline-none cursor-pointer ${
                        order.status === "Delivered"
                          ? "border-green-500 bg-green-50 text-green-700"
                          : order.status === "Cancelled"
                          ? "border-red-500 bg-red-50 text-red-700"
                          : "border-gray-100 bg-white"
                      }`}
                    >
                      <option value="Order Placed">คำสั่งซื้อใหม่</option>
                      <option value="Packing">กำลังแพ็คของ</option>
                      <option value="Shipped">ส่งให้ขนส่งแล้ว</option>
                      <option value="Out for delivery">กำลังนำจ่าย</option>
                      <option value="Delivered">ส่งสำเร็จ</option>
                      <option value="Cancelled">ยกเลิกออเดอร์</option>
                    </select>

                    <button className="w-full bg-gray-900 text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200">
                      พิมพ์ใบปะหน้า
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerOrders;

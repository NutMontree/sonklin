"use client";
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";

const MyOrders = () => {
  const { currency, getToken, user } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const { data } = await axios.get("/api/order/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setOrders(data.orders.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    const result = await Swal.fire({
      title: "ยืนยันการยกเลิก?",
      text: "คุณต้องการยกเลิกคำสั่งซื้อนี้ใช่หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, ยกเลิก",
      cancelButtonText: "ปิด",
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#9ca3af",
      borderRadius: "20px",
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);
      const token = await getToken();
      const { data } = await axios.post(
        "/api/order/cancel",
        { orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success("ยกเลิกออเดอร์แล้ว");
        fetchOrders();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    const result = await Swal.fire({
      title: "ลบประวัติ?",
      text: "รายการนี้จะถูกซ่อนออกจากประวัติการสั่งซื้อ",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "ลบประวัติ",
      confirmButtonColor: "#ef4444",
      borderRadius: "20px",
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingId(orderId);
      const token = await getToken();
      const { data } = await axios.delete(`/api/order/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
        toast.success("ลบข้อมูลสำเร็จ");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusStyle = (status) => {
    const s = status?.toLowerCase();
    switch (s) {
      case "order placed":
      case "ชำระเงินแล้ว":
        return {
          text: "รอยืนยัน",
          color: "text-blue-600",
          bg: "bg-blue-50",
          dot: "bg-blue-500",
        };
      case "pending":
        return {
          text: "กำลังเตรียมของ",
          color: "text-amber-600",
          bg: "bg-amber-50",
          dot: "bg-amber-500",
        };
      case "shipped":
        return {
          text: "จัดส่งแล้ว",
          color: "text-indigo-600",
          bg: "bg-indigo-50",
          dot: "bg-indigo-500",
        };
      case "delivered":
        return {
          text: "สำเร็จ",
          color: "text-green-600",
          bg: "bg-green-50",
          dot: "bg-green-600",
        };
      case "cancelled":
      case "canceled":
        return {
          text: "ยกเลิกแล้ว",
          color: "text-gray-400",
          bg: "bg-gray-100",
          dot: "bg-gray-400",
        };
      default:
        return {
          text: status,
          color: "text-gray-600",
          bg: "bg-gray-50",
          dot: "bg-gray-500",
        };
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  return (
    <div className="bg-[#fcfcfc] min-h-screen flex flex-col font-sans text-gray-900">
      <Navbar />
      <main className="flex-grow px-4 md:px-8 lg:px-16 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-black tracking-tight">
                Orders History
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                จัดการและติดตามคำสั่งซื้อทั้งหมด
              </p>
            </div>
            <button
              onClick={fetchOrders}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors active:rotate-180 duration-500"
            >
              <svg
                className="w-6 h-6 text-gray-400"
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
            </button>
          </div>

          {loading ? (
            <div className="py-20">
              <Loading />
            </div>
          ) : (
            <div className="grid gap-6">
              {orders.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-3xl border border-gray-100">
                  <p className="text-gray-300 font-medium">
                    ไม่มีรายการสั่งซื้อในขณะนี้
                  </p>
                </div>
              ) : (
                orders.map((order, index) => {
                  const status = getStatusStyle(order.status);
                  const isCancelable = [
                    "order placed",
                    "pending",
                    "ชำระเงินแล้ว",
                  ].includes(order.status?.toLowerCase());
                  const isDeletable = [
                    "delivered",
                    "cancelled",
                    "canceled",
                  ].includes(order.status?.toLowerCase());

                  return (
                    <div
                      key={index}
                      className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 group transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                    >
                      <div className="flex flex-col md:flex-row gap-8">
                        {/* Left Info */}
                        <div className="flex-grow space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform">
                              <Image
                                className="w-8 h-8 opacity-60"
                                src={assets.box_icon}
                                alt="box"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${status.bg} ${status.color}`}
                                >
                                  {status.text}
                                </span>
                              </div>
                              <h3 className="font-bold text-lg leading-tight">
                                {order.items
                                  .map(
                                    (item) =>
                                      `${item.product?.name} x${item.quantity}`
                                  )
                                  .join(", ")}
                              </h3>
                            </div>
                          </div>

                          {/* Address Box */}
                          <div className="bg-gray-50/50 p-5 rounded-[1.5rem] border border-gray-100/50">
                            <div className="flex items-start gap-3">
                              <div className="mt-1">
                                <svg
                                  className="w-4 h-4 text-gray-300"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <div className="text-sm">
                                <p className="font-bold text-gray-700">
                                  {order.address?.fullName}{" "}
                                  <span className="font-normal text-gray-400 ml-1">
                                    | {order.address?.phoneNumber}
                                  </span>
                                </p>
                                <p className="text-gray-500 mt-1 leading-relaxed">
                                  {order.address?.area} ต.
                                  {order.address?.subDistrict} อ.
                                  {order.address?.city} จ.{order.address?.state}{" "}
                                  {order.address?.pincode}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Summary & Actions */}
                        <div className="md:w-56 flex flex-col justify-between items-end gap-6 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
                          <div className="text-right w-full">
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter mb-1">
                              ราคาสินค้า
                            </p>
                            <p className="text-3xl font-black text-gray-900">
                              <span className="text-sm font-normal mr-1">
                                {currency}
                              </span>
                              {order.amount.toLocaleString()}
                            </p>
                            <p
                              className={`text-[10px] font-bold mt-1 ${
                                order.payment
                                  ? "text-green-500"
                                  : "text-amber-500"
                              }`}
                            >
                              {order.payment
                                ? "✓ Paid Online"
                                : "● Payment Pending"}
                            </p>
                          </div>

                          <div className="flex gap-2 w-full">
                            {isCancelable && (
                              <button
                                onClick={() => handleCancelOrder(order._id)}
                                className="flex-1 py-3 text-xs font-bold text-amber-600 bg-amber-50 rounded-2xl hover:bg-amber-100 transition-all active:scale-95"
                              >
                                ยกเลิก
                              </button>
                            )}
                            {isDeletable && (
                              <button
                                onClick={() => handleDeleteOrder(order._id)}
                                disabled={deletingId === order._id}
                                className="flex-1 py-3 text-xs font-bold text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all active:scale-95 disabled:opacity-50"
                              >
                                {deletingId === order._id ? "..." : "ลบประวัติ"}
                              </button>
                            )}
                            {!isCancelable && !isDeletable && (
                              <button className="flex-1 py-3 text-xs font-bold text-gray-300 bg-gray-50 rounded-2xl cursor-not-allowed">
                                ดำเนินการอยู่
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyOrders;

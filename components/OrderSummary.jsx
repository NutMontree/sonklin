"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const Spinner = () => (
  <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div className="w-16 h-16 border-4 border-t-orange-600 border-gray-300 rounded-full animate-spin"></div>
  </div>
);

const OrderSummary = () => {
  const router = useRouter();
  const {
    getCartCount,
    getCartAmount,
    getToken,
    user,
    cartItems,
    setCartItems,
    currency,
  } = useAppContext();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // ฟังก์ชันดึงที่อยู่ทั้งหมดของผู้ใช้
  const fetchUserAddresses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/user/get-address", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        const addresses =
          data.addresses || (data.user?.address ? [data.user.address] : []);
        setUserAddresses(addresses);

        if (addresses.length > 0 && !selectedAddress) {
          setSelectedAddress(addresses[0]);
        }
      }
    } catch (error) {
      console.error("Fetch Address Error:", error);
    }
  };

  useEffect(() => {
    if (user) fetchUserAddresses();
  }, [user]);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {
    if (loading) return;

    if (!selectedAddress) {
      toast.error("กรุณาเลือกที่อยู่ก่อนทำการสั่งซื้อ");
      return;
    }

    const cartItemsArray = Object.entries(cartItems)
      .map(([productId, quantity]) => ({ product: productId, quantity }))
      .filter((item) => item.quantity > 0);

    if (cartItemsArray.length === 0) {
      toast.error("ตะกร้าสินค้าว่างเปล่า");
      return;
    }

    setLoading(true);

    try {
      const subtotal = getCartAmount();
      const tax = subtotal * 0.02;
      const total = (subtotal + tax).toFixed(2);
      const token = await getToken();

      // 1. สร้างคำสั่งซื้อ
      const { data } = await axios.post(
        "/api/order/create",
        {
          address: selectedAddress._id,
          items: cartItemsArray,
          paymentMethod: paymentMethod,
          amount: total,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        // 2. ส่งแจ้งเตือน LINE
        const lineData = {
          name: user?.fullName || user?.username || "ลูกค้าทั่วไป",
          email: user?.primaryEmailAddress?.emailAddress || "-",
          subject: "รายการสั่งซื้อใหม่",
          message: `ช่องทาง: ${
            paymentMethod === "COD" ? "เก็บเงินปลายทาง" : "โอนเงิน"
          }`,
          address: `${selectedAddress.fullName} - ${
            selectedAddress.houseNumber || ""
          } ${selectedAddress.area || ""} ${selectedAddress.city || ""} ${
            selectedAddress.pincode || ""
          }`,
          total: `${currency}${Number(total).toLocaleString()}`,
        };

        await axios.post("/api/line", lineData).catch(() => {});

        toast.success("สั่งซื้อสำเร็จ!");
        setCartItems({});

        if (paymentMethod === "TRANSFER") {
          router.push(`/order-pay/${data.orderId}`);
        } else {
          router.push("/my-orders");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-3xl shadow-2xl border border-gray-50 relative overflow-hidden font-sans">
      {loading && <Spinner />}

      <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-orange-500 rounded-full"></span>
        สรุปคำสั่งซื้อ
      </h2>

      {/* --- ส่วนเลือกที่อยู่ --- */}
      <div className="mb-6">
        <label className="text-[10px] font-black uppercase text-gray-400 block mb-2 tracking-[0.15em]">
          ที่อยู่จัดส่ง
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full text-left px-4 py-3.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl text-gray-700 flex justify-between items-center transition-all"
          >
            <div className="truncate pr-4">
              {selectedAddress ? (
                <div className="text-sm">
                  <p className="font-bold truncate">
                    {selectedAddress.fullName}
                  </p>
                  <p className="font-normal text-gray-500 text-xs truncate">
                    {selectedAddress.houseNumber} {selectedAddress.area}{" "}
                    {selectedAddress.city} {selectedAddress.pincode}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-400">กรุณาเลือกที่อยู่...</p>
              )}
            </div>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* แก้ไข Dropdown ตามรูปแบบที่คุณต้องการ */}
          {isDropdownOpen && (
            <ul className="absolute w-full bg-white border border-gray-100 shadow-2xl mt-2 z-30 py-1.5 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="max-h-60 overflow-y-auto">
                {userAddresses.length > 0 ? (
                  userAddresses.map((address, index) => (
                    <li
                      key={index}
                      className="px-4 py-3 hover:bg-orange-50 cursor-pointer transition-colors border-b border-gray-50 last:border-none"
                      onClick={() => handleAddressSelect(address)}
                    >
                      <p className="text-sm font-bold text-gray-800">
                        {address.fullName}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {address.houseNumber}, {address.area}, {address.city},{" "}
                        {address.state}, {address.pincode},{" "}
                        {address.phoneNumber}
                      </p>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-4 text-xs text-center text-gray-400 italic">
                    ไม่พบข้อมูลที่อยู่
                  </li>
                )}
              </div>
              <li
                onClick={() => router.push("/add-address")}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-center text-xs font-bold text-orange-600 border-t border-gray-100"
              >
                + Add New Address
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* --- ส่วนเลือกวิธีการชำระเงิน --- */}
      <div className="mb-8">
        <label className="text-[10px] font-black uppercase text-gray-400 block mb-3 tracking-[0.15em]">
          วิธีการชำระเงิน
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div
            onClick={() => setPaymentMethod("COD")}
            className={`p-3 border-2 rounded-2xl cursor-pointer transition-all text-center ${
              paymentMethod === "COD"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-100 hover:border-gray-200"
            }`}
          >
            <div className="text-xl mb-1">🚚</div>
            <p
              className={`text-[11px] font-bold ${
                paymentMethod === "COD" ? "text-orange-600" : "text-gray-500"
              }`}
            >
              เก็บเงินปลายทาง
            </p>
          </div>
          <div
            onClick={() => setPaymentMethod("TRANSFER")}
            className={`p-3 border-2 rounded-2xl cursor-pointer transition-all text-center ${
              paymentMethod === "TRANSFER"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-100 hover:border-gray-200"
            }`}
          >
            <div className="text-xl mb-1">🏦</div>
            <p
              className={`text-[11px] font-bold ${
                paymentMethod === "TRANSFER"
                  ? "text-orange-600"
                  : "text-gray-500"
              }`}
            >
              โอนผ่านธนาคาร
            </p>
          </div>
        </div>
      </div>

      {/* --- รายละเอียดราคา --- */}
      <div className="space-y-3 bg-gray-50 p-4 rounded-2xl">
        <div className="flex justify-between text-xs text-gray-500">
          <span>ราคาสินค้า ({getCartCount()} ชิ้น)</span>
          <span>
            {currency}
            {getCartAmount().toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>ค่าจัดส่ง</span>
          <span className="text-green-600 font-bold">ฟรี</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>ภาษีบริการ (2%)</span>
          <span>
            {currency}
            {(getCartAmount() * 0.02).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
          <span className="text-sm font-bold text-gray-800">ยอดสุทธิ</span>
          <span className="text-xl font-black text-orange-600">
            {currency}
            {(getCartAmount() * 1.02).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>

      {/* --- ปุ่มดำเนินการ --- */}
      <button
        onClick={createOrder}
        disabled={loading}
        className={`w-full py-4 mt-6 rounded-2xl text-white font-black shadow-xl transition-all active:scale-[0.97] ${
          loading
            ? "bg-gray-400"
            : "bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-orange-200"
        }`}
      >
        {loading
          ? "กำลังบันทึก..."
          : paymentMethod === "COD"
          ? "ยืนยันสั่งซื้อ"
          : "ไปหน้าชำระเงิน"}
      </button>
    </div>
  );
};

export default OrderSummary;

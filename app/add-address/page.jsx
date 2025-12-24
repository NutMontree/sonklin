"use client";
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const AddAddress = () => {
  const { getToken, router } = useAppContext();

  // ปรับชื่อตัวแปรให้สื่อความหมายตามที่อยู่ไทย
  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: "",
    pincode: "", // รหัสไปรษณีย์
    area: "", // บ้านเลขที่, หมู่บ้าน, ซอย, ถนน
    subDistrict: "", // ตำบล/แขวง (เพิ่มใหม่)
    city: "", // อำเภอ/เขต
    state: "", // จังหวัด
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();

      // ส่งข้อมูลทั้งหมดไปยัง API
      const { data } = await axios.post(
        "/api/user/add-address",
        {
          fullName: address.fullName,
          phoneNumber: address.phoneNumber,
          pincode: address.pincode,
          area: address.area,
          subDistrict: address.subDistrict, // ส่งตำบลไปด้วย
          city: address.city,
          state: address.state,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("บันทึกที่อยู่สำเร็จ");
        router.push("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">
        <form onSubmit={onSubmitHandler} className="w-full">
          <p className="text-2xl md:text-3xl text-gray-500">
            เพิ่มที่อยู่{" "}
            <span className="font-semibold text-orange-600">จัดส่งสินค้า</span>
          </p>

          <div className="space-y-3 max-w-sm mt-10">
            {/* ชื่อ-นามสกุล */}
            <input
              className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
              type="text"
              placeholder="ชื่อ-นามสกุล ผู้รับ"
              onChange={(e) =>
                setAddress({ ...address, fullName: e.target.value })
              }
              value={address.fullName}
              required
            />

            {/* เบอร์โทรศัพท์ */}
            <input
              className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
              type="tel"
              placeholder="เบอร์โทรศัพท์"
              onChange={(e) =>
                setAddress({ ...address, phoneNumber: e.target.value })
              }
              value={address.phoneNumber}
              required
            />

            {/* บ้านเลขที่ / ถนน / ซอย */}
            <textarea
              className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500 resize-none"
              rows={3}
              placeholder="บ้านเลขที่, หมู่บ้าน, ถนน, ซอย"
              onChange={(e) => setAddress({ ...address, area: e.target.value })}
              value={address.area}
              required
            ></textarea>

            {/* แถวที่ 1: ตำบล + อำเภอ */}
            <div className="flex space-x-3">
              <input
                className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                type="text"
                placeholder="ตำบล/แขวง"
                onChange={(e) =>
                  setAddress({ ...address, subDistrict: e.target.value })
                }
                value={address.subDistrict}
                required
              />
              <input
                className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                type="text"
                placeholder="อำเภอ/เขต"
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                value={address.city}
                required
              />
            </div>

            {/* แถวที่ 2: จังหวัด + รหัสไปรษณีย์ */}
            <div className="flex space-x-3">
              <input
                className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                type="text"
                placeholder="จังหวัด"
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
                value={address.state}
                required
              />
              <input
                className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                type="text"
                maxLength="5"
                placeholder="รหัสไปรษณีย์"
                onChange={(e) =>
                  setAddress({ ...address, pincode: e.target.value })
                }
                value={address.pincode}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="max-w-sm w-full mt-6 bg-orange-600 text-white py-3 hover:bg-orange-700 font-medium rounded-md transition-colors shadow-md"
          >
            บันทึกที่อยู่
          </button>
        </form>

        <div className="hidden md:block md:mr-16 mt-16 md:mt-0">
          <Image
            className="w-[350px] h-auto"
            src={assets.my_location_image}
            alt="my_location_image"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddAddress;

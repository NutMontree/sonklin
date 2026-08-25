"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";
import Image from "next/image";

const EditProductPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { getToken } = useAppContext();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ ดึงข้อมูลสินค้าเดิมมาแสดงในฟอร์ม
  const fetchProduct = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`/api/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setProduct(data.product);
      } else {
        toast.error(data.message || "ไม่พบข้อมูลสินค้า");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  // ✏️ เมื่อแก้ไข input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // 💾 อัปเดตสินค้า
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const token = await getToken();

      const { data } = await axios.put(
        `/api/product/${id}`,
        {
          name: product.name,
          category: product.category,
          offerPrice: product.offerPrice,
          stock: product.stock || 0,
          description: product.description,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("อัปเดตสินค้าสำเร็จ");
        router.push("/seller/product-list"); // ✅ กลับไปหน้ารายการสินค้า
      } else {
        toast.error(data.message || "ไม่สามารถอัปเดตสินค้าได้");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  if (!product)
    return (
      <div className="p-10 text-center text-gray-500">ไม่พบข้อมูลสินค้า</div>
    );

  return (
    <div className="flex-1 min-h-screen bg-gray-50/50 p-6 md:p-10 font-sans flex flex-col">
      <div className="mb-8 flex items-center justify-between max-w-4xl mx-auto w-full">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <span className="w-2.5 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full"></span>
            แก้ไขสินค้า
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-2 ml-5">
            ปรับปรุงรายละเอียดและข้อมูลของสินค้าในระบบ
          </p>
        </div>
        
        <button
          onClick={() => router.push("/seller/product-list")}
          className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-bold shadow-sm hover:border-gray-300 hover:bg-gray-50 transition-all active:scale-95"
        >
          กลับหน้ารายการ
        </button>
      </div>

      <div className="max-w-4xl mx-auto w-full bg-white rounded-[2rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
        {/* Header with Image Background if available */}
        <div className="h-32 md:h-48 bg-gradient-to-r from-gray-900 to-gray-800 relative overflow-hidden">
            {product.image && product.image[0] && (
                <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                    <Image src={product.image[0]} alt="Background" fill className="object-cover blur-sm scale-110" />
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 md:left-10 flex items-end gap-5">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl border-4 border-white overflow-hidden bg-white shadow-lg relative z-10">
                    {product.image && product.image[0] ? (
                        <Image src={product.image[0]} alt="Product" fill className="object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400 text-xs font-bold">ไม่มีรูป</span>
                        </div>
                    )}
                </div>
                <div className="relative z-10 pb-2 hidden md:block">
                    <h2 className="text-2xl font-black text-white drop-shadow-md truncate max-w-md">{product.name}</h2>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-md text-white text-[11px] font-bold tracking-wider uppercase mt-2 inline-block shadow-sm">
                        {product.category || 'N/A'}
                    </span>
                </div>
            </div>
        </div>

        <form onSubmit={handleSave} className="p-6 md:p-10 space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">ชื่อสินค้า <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-gray-400"
                        placeholder="พิมพ์ชื่อสินค้า..."
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">หมวดหมู่สินค้า</label>
                    <div className="relative">
                        <select
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all appearance-none cursor-pointer"
                        >
                            <option value="Thai_desserts">ขนมไทย</option>
                            <option value="Thai_dessert_set">ชุดขนมไทย</option>
                            <option value="Snack_break">ขนมจัดเบรค</option>
                            <option value="Auspicious_Thai_desserts">ขนมไทยมงคล</option>
                            <option value="Bakery">เบเกอรี่</option>
                            <option value="Herbal_water">น้ำสมุนไพร</option>
                            <option value="Sweet_water">น้ำหวาน</option>
                            {/* Fallback option in case the DB has an old category not in this list */}
                            {!["Thai_desserts", "Thai_dessert_set", "Snack_break", "Auspicious_Thai_desserts", "Bakery", "Herbal_water", "Sweet_water"].includes(product.category) && (
                                <option value={product.category}>{product.category}</option>
                            )}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">ราคาขาย (บาท) <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">฿</span>
                        <input
                            type="number"
                            name="offerPrice"
                            value={product.offerPrice}
                            onChange={handleChange}
                            className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 rounded-xl pl-8 pr-4 py-3 text-sm font-black focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">สต๊อกสินค้า (ชิ้น)</label>
                    <div className="relative">
                        <input
                            type="number"
                            name="stock"
                            value={product.stock || 0}
                            onChange={handleChange}
                            className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm font-black focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">รายละเอียดสินค้า</label>
                <textarea
                    name="description"
                    value={product.description || ""}
                    onChange={handleChange}
                    className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all min-h-[150px] resize-y placeholder:text-gray-400 leading-relaxed"
                    placeholder="อธิบายรายละเอียด สรรพคุณ หรือข้อมูลน่าสนใจเกี่ยวกับสินค้าชิ้นนี้..."
                />
            </div>

            <div className="pt-4 border-t border-gray-100 flex gap-4 justify-end">
                <button
                    type="button"
                    onClick={() => router.push("/seller/product-list")}
                    className="px-8 py-3.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold shadow-sm hover:border-gray-300 hover:bg-gray-50 transition-all active:scale-95"
                >
                    ยกเลิก
                </button>
                <button
                    type="submit"
                    disabled={saving}
                    className={`px-10 py-3.5 text-white rounded-xl font-black shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center min-w-[160px] ${
                        saving 
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none" 
                        : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/30"
                    }`}
                >
                    {saving ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                            กำลังบันทึก...
                        </>
                    ) : (
                        "บันทึกการแก้ไข"
                    )}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;

"use client";
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { getToken } = useAppContext();

  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("ขนมไทย");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [stock, setStock] = useState("");

  const removeImage = (indexToRemove, e) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedFiles = [...files];
    updatedFiles.splice(indexToRemove, 1);
    setFiles(updatedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("offerPrice", offerPrice);
    formData.append("stock", stock);

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const token = await getToken();

      const { data } = await axios.post("/api/product/add", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success(data.message);
        setFiles([]);
        setName("");
        setDescription("");
        setCategory("ขนมไทย");
        setPrice("");
        setOfferPrice("");
        setStock("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex-1 min-h-screen flex flex-col justify-between">
        <form
          onSubmit={handleSubmit}
          className="md:p-10 p-6 space-y-8 w-full max-w-4xl mx-auto bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 my-8 relative overflow-hidden"
        >
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -z-10"></div>
          
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">เพิ่มสินค้าใหม่ ✨</h2>
            <p className="text-sm text-gray-500 font-medium">กรอกข้อมูลรายละเอียดสินค้าให้ครบถ้วนเพื่อวางจำหน่าย</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-200">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">ภาพสินค้า (สูงสุด 4 รูป)</p>
            <div className="flex flex-wrap items-center gap-4">
              {[...Array(4)].map((_, index) => (
                <label key={index} htmlFor={`image${index}`} className="group relative cursor-pointer block">
                  <input
                    onChange={(e) => {
                      const selectedFiles = Array.from(e.target.files);
                      if (selectedFiles.length > 0) {
                        const updatedFiles = [...files];
                        let fIndex = 0;
                        // เติมรูปตั้งแต่ช่องที่คลิกเป็นต้นไป (สูงสุด 4 รูป)
                        for (let i = index; i < 4 && fIndex < selectedFiles.length; i++) {
                          updatedFiles[i] = selectedFiles[fIndex++];
                        }
                        setFiles(updatedFiles);
                      }
                    }}
                    type="file"
                    multiple
                    id={`image${index}`}
                    hidden
                  />
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-white border-2 border-transparent group-hover:border-orange-400 shadow-sm transition-all relative">
                    <Image
                      className="object-cover w-full h-full"
                      src={
                        files[index]
                          ? URL.createObjectURL(files[index])
                          : assets.upload_area
                      }
                      alt="upload"
                      width={100}
                      height={100}
                    />
                    {!files[index] ? (
                      <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center opacity-80 group-hover:opacity-100 group-hover:bg-orange-50 transition-colors">
                        <span className="text-2xl text-gray-300 group-hover:text-orange-400">+</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => removeImage(index, e)}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md transform scale-0 group-hover:scale-100 transition-transform duration-200"
                        title="ลบรูปภาพ"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400" htmlFor="product-name">
                ชื่อผลิตภัณฑ์
              </label>
              <input
                id="product-name"
                type="text"
                placeholder="เช่น ขนมต้มอบควันเทียน"
                className="w-full outline-none py-3.5 px-4 bg-gray-50 rounded-xl border-2 border-transparent focus:bg-white focus:border-orange-500 text-sm font-medium transition-all"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400" htmlFor="category">
                ประเภท
              </label>
              <div className="relative">
                <select
                  id="category"
                  className="w-full outline-none py-3.5 px-4 bg-gray-50 rounded-xl border-2 border-transparent focus:bg-white focus:border-orange-500 text-sm font-medium transition-all appearance-none cursor-pointer"
                  onChange={(e) => setCategory(e.target.value)}
                  defaultValue={category}
                >
                  <option value="Thai_desserts">ขนมไทย</option>
                  <option value="Thai_dessert_set">ชุดขนมไทย</option>
                  <option value="Snack_break">ขนมจัดเบรค</option>
                  <option value="Auspicious_Thai_desserts">ขนมไทยมงคล</option>
                  <option value="Bakery">เบเกอรี่</option>
                  <option value="Herbal_water">น้ำสมุนไพร</option>
                  <option value="Sweet_water">น้ำหวาน</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400" htmlFor="product-description">
              รายละเอียดสินค้า
            </label>
            <textarea
              id="product-description"
              rows={4}
              className="w-full outline-none py-3.5 px-4 bg-gray-50 rounded-xl border-2 border-transparent focus:bg-white focus:border-orange-500 text-sm font-medium transition-all resize-none"
              placeholder="อธิบายจุดเด่น รสชาติ หรือส่วนผสมของสินค้า..."
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400" htmlFor="product-price">
                ราคาปกติ (บาท)
              </label>
              <input
                id="product-price"
                type="number"
                placeholder="0"
                className="w-full outline-none py-3.5 px-4 bg-gray-50 rounded-xl border-2 border-transparent focus:bg-white focus:border-orange-500 text-sm font-bold transition-all"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400" htmlFor="offer-price">
                ราคาขาย/ลดพิเศษ (บาท)
              </label>
              <input
                id="offer-price"
                type="number"
                placeholder="0"
                className="w-full outline-none py-3.5 px-4 bg-orange-50/50 rounded-xl border-2 border-transparent focus:bg-white focus:border-orange-500 text-sm font-bold text-orange-600 transition-all placeholder:text-orange-200"
                onChange={(e) => setOfferPrice(e.target.value)}
                value={offerPrice}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400" htmlFor="product-stock">
                จำนวนสต๊อก (ชิ้น)
              </label>
              <input
                id="product-stock"
                type="number"
                placeholder="0"
                className="w-full outline-none py-3.5 px-4 bg-gray-50 rounded-xl border-2 border-transparent focus:bg-white focus:border-orange-500 text-sm font-bold transition-all"
                onChange={(e) => setStock(e.target.value)}
                value={stock}
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black uppercase tracking-wider text-sm rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              + บันทึกข้อมูลสินค้า
            </button>
          </div>
        </form>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default AddProduct;

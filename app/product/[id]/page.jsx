"use client";
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";

const Product = () => {
  const { id } = useParams();

  const { products, router, addToCart } = useAppContext();

  const [mainImage, setMainImage] = useState(null);
  const [productData, setProductData] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  // Review states
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchProductData = async () => {
    // In a real app we'd fetch directly from API to get fresh reviews, but using context here:
    const product = products.find((product) => product._id === id);
    setProductData(product);
  };

  const toggleWishlist = async () => {
    try {
      const response = await fetch("/api/user/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id })
      });
      const data = await response.json();
      if (data.success) {
        setWishlist(data.wishlist);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("Error updating wishlist");
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!comment) return toast.error("กรุณากรอกคอมเมนต์");
    try {
      setSubmittingReview(true);
      const response = await fetch("/api/product/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, rating, comment })
      });
      const data = await response.json();
      if (data.success) {
        toast.success("รีวิวสำเร็จ!");
        setComment("");
        // Reload page to get new reviews (or update context in a real app)
        window.location.reload();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error submitting review");
    } finally {
      setSubmittingReview(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [id, products.length]);

  return productData ? (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
              <Image
                src={mainImage || productData.image[0]}
                alt="alt"
                className="w-full h-auto object-cover mix-blend-multiply"
                width={1280}
                height={720}
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {productData.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(image)}
                  className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                >
                  <Image
                    src={image}
                    alt="alt"
                    className="w-full h-auto object-cover mix-blend-multiply"
                    width={1280}
                    height={720}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
              {productData.name}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Image
                    key={i}
                    className="h-4 w-4"
                    src={
                      i < (productData.reviews?.length > 0 ? Math.round(productData.reviews.reduce((a, b) => a + b.rating, 0) / productData.reviews.length) : 5)
                        ? assets.star_icon
                        : assets.star_dull_icon
                    }
                    alt="star"
                  />
                ))}
              </div>
              <p>({productData.reviews?.length || 0} รีวิว)</p>
            </div>
            <p className="text-gray-600 mt-3">{productData.description}</p>
            <p className="text-3xl font-medium mt-6">
              ฿{productData.offerPrice}
              <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                ฿{productData.price}
              </span>
            </p>
            <hr className="bg-gray-600 my-6" />
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full max-w-72">
                <tbody>
                  <tr>
                    <td className="text-gray-600 font-medium">Brand</td>
                    <td className="text-gray-800/50 ">Generic</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-medium">Color</td>
                    <td className="text-gray-800/50 ">Multi</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-medium">Category</td>
                    <td className="text-gray-800/50">{productData.category}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center mt-10 gap-4 relative">
              <button
                onClick={() => addToCart(productData._id)}
                className="flex-[2] py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gray-900/20 active:translate-y-0 transition-all duration-300"
              >
                หยิบใส่ตะกร้า
              </button>
              
              <button
                onClick={toggleWishlist}
                className={`flex-1 py-4 flex items-center justify-center gap-2 rounded-2xl font-black border-2 transition-all duration-300 group ${
                  wishlist.includes(id) 
                    ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100 shadow-lg shadow-red-500/10" 
                    : "bg-white border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400 hover:bg-red-50/50"
                }`}
              >
                <svg className={`w-6 h-6 transition-transform duration-300 group-hover:scale-110 ${wishlist.includes(id) ? 'fill-current animate-[ping_0.5s_cubic-bezier(0,0,0.2,1)_1]' : 'stroke-current fill-none'}`} viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlist.includes(id) ? "บันทึกแล้ว" : "เก็บไว้ดู"}
              </button>
              
              <button
                onClick={() => {
                  addToCart(productData._id);
                  router.push("/cart");
                }}
                className="flex-[2] py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-red-600 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/30 active:translate-y-0 transition-all duration-300"
              >
                ซื้อเลยทันที
              </button>
            </div>
          </div>
        </div>
        
        {/* Review Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">คะแนนและรีวิว</h2>
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest">{productData.reviews?.length || 0} รีวิว</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Form Column */}
            <div className="md:col-span-5">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/10 transition-colors" />
                <h3 className="font-black text-xl mb-6 text-gray-800">เขียนรีวิวของคุณ ✨</h3>
                <form onSubmit={submitReview} className="space-y-6 relative">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">ให้คะแนนความพึงพอใจ</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                            rating >= star ? 'bg-orange-50 text-orange-500 border-2 border-orange-200 scale-110' : 'bg-gray-50 text-gray-300 border-2 border-transparent hover:bg-orange-50/50 hover:text-orange-300'
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">ความคิดเห็น</label>
                    <textarea 
                      value={comment} 
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-orange-500 outline-none transition-all resize-none text-sm font-medium"
                      rows="4"
                      placeholder="บอกความรู้สึกของคุณหลังจากได้รับสินค้านี้..."
                    ></textarea>
                  </div>
                  <button disabled={submittingReview} type="submit" className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-wider text-sm hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    {submittingReview ? "กำลังส่ง..." : "ส่งรีวิวเลย"}
                  </button>
                </form>
              </div>
            </div>

            {/* List Column */}
            <div className="md:col-span-7">
              <div className="space-y-4">
                {productData.reviews && productData.reviews.length > 0 ? (
                  productData.reviews.map((review, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold shadow-inner">
                            {review.userId.substring(review.userId.length - 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex gap-0.5 text-orange-500 text-sm">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < review.rating ? "opacity-100" : "opacity-20 text-gray-300"}>★</span>
                              ))}
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{new Date(review.date).toLocaleDateString("th-TH")}</span>
                          </div>
                        </div>
                        <span className="text-xs font-bold bg-green-50 text-green-600 px-2 py-1 rounded-md flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> 
                          ซื้อแล้ว
                        </span>
                      </div>
                      <p className="text-gray-700 font-medium text-sm ml-13 leading-relaxed bg-gray-50 p-4 rounded-2xl rounded-tl-none">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="h-full min-h-[300px] flex flex-col items-center justify-center bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-200">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    </div>
                    <p className="text-gray-500 font-medium">ยังไม่มีรีวิวสำหรับสินค้านี้</p>
                    <p className="text-xs text-gray-400 mt-1">เป็นคนแรกที่เขียนรีวิวสิ!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-4 mt-16">
            <p className="text-3xl font-medium">
              สินค้า <span className="font-medium text-orange-600">เด่น</span>
            </p>
            <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
            {products.slice(0, 5).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
            ดูเพิ่มเติม
          </button>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default Product;

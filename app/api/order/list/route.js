import connectDB from "@/config/db";
import Address from "@/models/Address";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }

    await connectDB();

    /** * การเรียก Model ทิ้งไว้เพื่อป้องกัน Mongoose Error: "Schema hasn't been registered for model"
     * เมื่อมีการใช้ .populate() ข้าม Collection
     */
    Address.length;
    Product.length;

    /**
     * ดึงข้อมูล Order ของ User พร้อมแปลง ID ให้เป็นข้อมูล Text (Object) เต็มรูปแบบ
     * .populate('address') -> ดึงชื่อผู้รับ, เบอร์โทร, ที่อยู่ จากคอลเลกชัน addresses
     * .populate('items.product') -> ดึงชื่อสินค้า และรายละเอียดจากคอลเลกชัน products
     */
    const orders = await Order.find({ userId })
      .populate("address")
      .populate("items.product")
      .sort({ date: -1 }); // เรียงจากรายการล่าสุดขึ้นก่อน

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    return NextResponse.json({ success: false, message: error.message });
  }
}

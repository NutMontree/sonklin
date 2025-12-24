import { NextResponse } from "next/server";
import connectDB from "@/config/db"; // 1. ต้อง import ฟังก์ชันเชื่อมต่อ DB (เช็ค path ของคุณว่าอยู่ไหน)
import Order from "@/models/Order"; // 2. ต้อง import Order Model (เช็คว่าไฟล์ model คุณชื่ออะไร)

export async function POST(request) {
  try {
    // 3. เชื่อมต่อ Database ก่อนทำรายการเสมอ
    await connectDB();

    const { orderId, status } = await request.json();

    // 4. ใช้ Model ที่ import มา (ในที่นี้ใช้ชื่อ Order แทน OrderModel เพื่อความกระชับ)
    await Order.findByIdAndUpdate(orderId, { status: status });

    return NextResponse.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}

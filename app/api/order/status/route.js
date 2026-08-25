import { NextResponse } from "next/server";
import connectDB from "@/config/db"; // 1. ต้อง import ฟังก์ชันเชื่อมต่อ DB (เช็ค path ของคุณว่าอยู่ไหน)
import Order from "@/models/Order"; // 2. ต้อง import Order Model (เช็คว่าไฟล์ model คุณชื่ออะไร)

export async function POST(request) {
  try {
    // 3. เชื่อมต่อ Database ก่อนทำรายการเสมอ
    await connectDB();

    const { orderId, status, courier, trackingNumber } = await request.json();

    let updateData = {};
    if (status) updateData.status = status;
    if (courier !== undefined) updateData.courier = courier;
    if (trackingNumber !== undefined) updateData.trackingNumber = trackingNumber;

    // 4. ใช้ Model ที่ import มา
    await Order.findByIdAndUpdate(orderId, updateData);

    return NextResponse.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}

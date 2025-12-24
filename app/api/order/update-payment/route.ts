import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Order from "@/models/Order";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    // 1. ตรวจสอบสิทธิ์
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "กรุณาเข้าสู่ระบบ" },
        { status: 401 }
      );
    }

    // 2. รับข้อมูล
    const { orderId, payment } = await req.json();

    if (!orderId || typeof payment !== "boolean") {
      return NextResponse.json(
        { success: false, message: "ข้อมูลไม่ถูกต้อง" },
        { status: 400 }
      );
    }

    // 3. อัปเดตเฉพาะฟิลด์ payment เพื่อให้สถานะเงินแยกจากสถานะขนส่ง
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { payment: payment },
      { new: true, runValidators: false }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: "ไม่พบคำสั่งซื้อ" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "อัปเดตสถานะการเงินสำเร็จ",
      payment: updatedOrder.payment, // ส่งค่าที่อัปเดตกลับไปด้วย
    });
  } catch (error) {
    console.error("UPDATE PAYMENT ERROR:", error);
    return NextResponse.json(
      { success: false, message: "เกิดข้อผิดพลาด" },
      { status: 500 }
    );
  }
}

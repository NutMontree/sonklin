import connectDB from "@/config/db";
import Address from "@/models/Address";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { fullName, phoneNumber, pincode, area, city, state } =
      await request.json();

    await connectDB();

    const newAddress = await Address.create({
      userId,
      fullName,
      phoneNumber,
      pincode,
      area,
      city,
      state,
    });

    return NextResponse.json({
      success: true,
      message: "Address added successfully",
      newAddress,
    });
  } catch (error) {
    // แก้ไขจาก catch { error } { เป็น (error)
    console.error("Add Address Error:", error);
    return NextResponse.json({ success: false, message: error.message });
  }
}

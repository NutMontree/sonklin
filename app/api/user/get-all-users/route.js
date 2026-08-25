import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
    try {
        const { userId } = getAuth(request);

        // ตรวจสอบสิทธิ์ว่าได้ล็อกอินหรือไม่
        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" });
        }

        await connectDB();

        // ดึงข้อมูล User ทั้งหมด
        const users = await User.find({}).lean();

        return NextResponse.json({ success: true, users });

    } catch (error) {
        console.error("Error fetching all users:", error);
        return NextResponse.json({ success: false, message: error.message });
    }
}

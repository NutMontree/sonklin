import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { userId: requesterId } = getAuth(request);

        // ตรวจสอบสิทธิ์ว่าได้ล็อกอินหรือไม่
        if (!requesterId) {
            return NextResponse.json({ success: false, message: "Unauthorized" });
        }

        const { targetUserId, role } = await request.json();

        if (!targetUserId || !role) {
            return NextResponse.json({ success: false, message: "Missing required fields" });
        }

        if (role !== "user" && role !== "admin") {
            return NextResponse.json({ success: false, message: "Invalid role" });
        }

        await connectDB();

        // Update the user's role
        const updatedUser = await User.findByIdAndUpdate(
            targetUserId,
            { role: role },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ success: false, message: "User not found" });
        }

        return NextResponse.json({ success: true, message: "อัปเดตสิทธิ์สำเร็จ", user: updatedUser });

    } catch (error) {
        console.error("Error updating user role:", error);
        return NextResponse.json({ success: false, message: error.message });
    }
}

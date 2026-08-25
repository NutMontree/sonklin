import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import User from '@/models/User';

const authSeller = async (userId) => {
    try {
        const client = await clerkClient()
        const user = await client.users.getUser(userId)

        // ตรวจสอบ Clerk Metadata (ระบบเก่า)
        if (user.publicMetadata.role === 'seller') {
            return true;
        }

        // ตรวจสอบ MongoDB Role (ระบบใหม่ - Admin)
        await connectDB();
        const dbUser = await User.findById(userId);
        if (dbUser && dbUser.role === 'admin') {
            return true;
        }

        return false;
    } catch (error) {
        return false; // เปลี่ยนจากคืนค่า NextResponse เป็น boolean ปกติ
    }
}

export default authSeller;
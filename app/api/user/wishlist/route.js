import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(request) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" });
        }

        const { productId } = await request.json();

        await connectDB();
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" });
        }

        const wishlist = user.wishlist || [];
        const index = wishlist.indexOf(productId);
        
        let isAdded = false;
        if (index > -1) {
            wishlist.splice(index, 1);
        } else {
            wishlist.push(productId);
            isAdded = true;
        }

        user.wishlist = wishlist;
        await user.save();

        return NextResponse.json({ success: true, message: isAdded ? "เพิ่มรายการโปรดแล้ว" : "นำออกจากรายการโปรดแล้ว", wishlist: user.wishlist });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

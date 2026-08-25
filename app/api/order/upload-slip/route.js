import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Order from "@/models/Order";
import { getAuth } from "@clerk/nextjs/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
    try {
        const { userId } = getAuth(request);

        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" });
        }

        const formData = await request.formData();
        const orderId = formData.get("orderId");
        const file = formData.get("image");

        if (!orderId || !file) {
            return NextResponse.json({ success: false, message: "Missing order ID or slip image" });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "slips" },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            stream.end(buffer);
        });

        await connectDB();
        
        // Ensure the order belongs to the user
        const order = await Order.findOne({ _id: orderId, userId: userId });
        
        if (!order) {
            return NextResponse.json({ success: false, message: "Order not found" });
        }

        order.slipImage = uploadResult.secure_url;
        await order.save();

        return NextResponse.json({ success: true, message: "อัปโหลดสลิปสำเร็จ", slipUrl: uploadResult.secure_url });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

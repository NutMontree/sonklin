import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(request) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" });
        }

        const { productId, rating, comment } = await request.json();

        await connectDB();
        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json({ success: false, message: "Product not found" });
        }

        // Check if user already reviewed
        const alreadyReviewed = product.reviews.find(r => r.userId === userId);
        if (alreadyReviewed) {
            return NextResponse.json({ success: false, message: "You already reviewed this product" });
        }

        product.reviews.push({
            userId,
            rating: Number(rating),
            comment
        });

        await product.save();
        return NextResponse.json({ success: true, message: "Review added successfully", product });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

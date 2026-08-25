import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: "user" },
    name: { type: String, required: true, },
    description: { type: String, required: true, },
    price: { type: Number, required: true, },
    offerPrice: { type: Number, required: true, },
    stock: { type: Number, required: true, default: 0 },
    image: { type: Array, required: true, },
    category: { type: String, required: true, },
    date: { type: Number, required: true, },
    reviews: [
        {
            userId: { type: String, required: true },
            rating: { type: Number, required: true },
            comment: { type: String },
            date: { type: Number, default: Date.now }
        }
    ],
})

const Product = mongoose.models.product || mongoose.model("product", productSchema)

export default Product
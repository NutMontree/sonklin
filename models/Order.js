import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: "user" },
  items: [
    {
      product: { type: String, required: true, ref: "product" },
      quantity: { type: Number, required: true },
    },
  ],
  amount: { type: Number, required: true },
  address: { type: String, required: true, ref: "address" },
  status: { type: String, required: true, default: "สั่งซื้อแล้ว" },
  // 👇 เพิ่มฟิลด์นี้เข้าไป เพื่อให้ระบบบันทึกสถานะเงินเข้าได้
  payment: { type: Boolean, required: true, default: false },
  // ----------------------------------------------------
  slipImage: { type: String, default: "" },
  trackingNumber: { type: String, default: "" },
  courier: { type: String, default: "" },
  date: { type: Number, required: true },
});

const Order = mongoose.models.order || mongoose.model("order", orderSchema);

export default Order;

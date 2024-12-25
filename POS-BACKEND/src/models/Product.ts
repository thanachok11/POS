import mongoose, { Document, Schema } from 'mongoose';
// สร้าง interface สำหรับ Product
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  barcode: string; // New barcode field
  imageUrl: string;  // เก็บ URL ขอ
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    barcode: { type: String, required: true, unique: true }, // New barcode field
    stock: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    imageUrl: { type: String }  // เก็บ URL ของภาพ

  },
  {
    timestamps: true,  // Mongoose จะช่วยบันทึกเวลาของ createdAt และ updatedAt โดยอัตโนมัติ
  }
);

export default mongoose.models.Product || mongoose.model<IProduct>('products', ProductSchema);

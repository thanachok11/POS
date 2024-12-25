import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';
import cloudinary from 'cloudinary';

// ฟังก์ชันค้นหาสินค้าจาก barcode
export const getProductByBarcode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const barcode = req.params.barcode; // ดึง barcode จาก URL params

    // ค้นหาสินค้าจาก barcode
    const product = await Product.findOne({ barcode });

    if (!product) {
      // หากไม่พบสินค้า, ส่ง status 404
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    // หากพบสินค้า, ส่ง status 200 พร้อมข้อมูลสินค้า
    res.status(200).json(product);
  } catch (error) {
    // หากเกิดข้อผิดพลาดภายใน, ส่ง status 500
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await Product.find(); // ค้นหาสินค้าทั้งหมดจาก MongoDB

    // ส่งข้อมูลสินค้าทั้งหมดกลับไปในรูปแบบ JSON
    res.json(products);
  } catch (error) {
    // หากเกิดข้อผิดพลาดภายใน, ส่ง status 500
    res.status(500).json({ message: 'Server error', error });
  }
};


// เชื่อมต่อ Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadProductImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // เช็คว่าไฟล์มีอยู่ใน req.file หรือไม่
    if (!req.file) {
      res.status(400).json({ message: "No image file provided" });
      return ;
    }

    // อัพโหลดไฟล์ไปยัง Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path);

    // เก็บ URL ของภาพในฐานข้อมูล
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      barcode: req.body.barcode,
      description: req.body.description,
      imageUrl: result.secure_url // เก็บ URL ของภาพที่อัพโหลดจาก Cloudinary
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully', newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

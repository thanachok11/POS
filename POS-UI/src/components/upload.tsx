import React, { useState } from 'react';
import axios from 'axios';
import { uploadProduct } from "../api/productApi.ts"; // Make sure this import is correct

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    barcode: '',
    stock: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงของฟอร์ม
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ฟังก์ชันสำหรับการเลือกไฟล์
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
    }
  };

  // ฟังก์ชันสำหรับส่งข้อมูลไปยัง backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ตรวจสอบว่าผู้ใช้กรอกข้อมูลครบถ้วนหรือไม่
    if (
      !productData.name ||
      !productData.description ||
      !productData.price ||
      !productData.category ||
      !productData.barcode ||
      !productData.stock ||
      !image
    ) {
      setMessage('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    formData.append('barcode', productData.barcode);
    formData.append('stock', productData.stock);
    formData.append('image', image);

    try {
      const response = await uploadProduct(formData);  // Call the uploadProduct function here
      setMessage('เพิ่มสินค้าเสร็จเรียบร้อย');
      setProductData({
        name: '',
        description: '',
        price: '',
        category: '',
        barcode: '',
        stock: '',
      });
      setImage(null);
    } catch (error) {
      setMessage('เกิดข้อผิดพลาดในการเพิ่มสินค้า');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>เพิ่มสินค้าใหม่</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ชื่อสินค้า:</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>รายละเอียดสินค้า:</label>
          <input
            type="text"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>ราคา:</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>หมวดหมู่:</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>บาร์โค้ด:</label>
          <input
            type="text"
            name="barcode"
            value={productData.barcode}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>จำนวน:</label>
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>เลือกรูปภาพสินค้า:</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'กำลังอัปโหลด...' : 'เพิ่มสินค้า'}
          </button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddProductForm;

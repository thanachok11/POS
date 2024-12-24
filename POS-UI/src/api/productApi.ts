import axios from "axios";
export const getProducts = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
// ฟังก์ชันเพื่อดึงสินค้าจาก barcode
export const getProductByBarcode = async (barcode: string) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/product/barcode/${barcode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by barcode:", error);
    throw error;
  }
};

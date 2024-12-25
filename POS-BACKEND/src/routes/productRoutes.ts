import express from "express";
import {getAllProducts,getProductByBarcode,uploadProductImage} from "../controllers/productController";


const router = express.Router();
router.get('/', getAllProducts);
router.get('/:barcode', getProductByBarcode);
router.post('/upload', uploadProductImage);
export default router;
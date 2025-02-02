import express from "express";
import { changeSetting, checkCode, createProduct, deleteProduct, getCode, getProducts, getSetting, initData, updateProduct, updateStory, uploadLogo } from "../controllers/app.controller.js";
const router = express.Router();

router.get('/get-setting', getSetting);
router.post('/change-setting', changeSetting);
router.post('/init', initData);
router.get('/get-code', getCode);
router.post('/check-code', checkCode);
router.post('/upload-logo', uploadLogo);

router.post('/create-product', createProduct);
router.post('/update-product', updateProduct);
router.get('/get-product', getProducts);
router.delete('/delete-product/:_id', deleteProduct);
router.post('/update-story', updateStory)
export default router;
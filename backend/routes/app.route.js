import express from "express";
import { changeSetting, checkCode, createProduct, deleteProduct, generate2fa, getCode, getProducts, getSetting, initData, resetQr2fa, updateBanner, updateBannerStory, updateProduct, updateStory, uploadLogo, verify2fa } from "../controllers/app.controller.js";
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
router.put('/update-banner', updateBanner)
router.put('/update-banner-story', updateBannerStory)
//verify 2fa
router.post('/generate-2fa', generate2fa)
router.post('/verify-2fa', verify2fa)
router.post('/reset-2fa', resetQr2fa)
export default router;
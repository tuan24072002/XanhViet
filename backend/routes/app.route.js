import express from "express";
import { changeSetting, checkCode, getCode, getSetting, initData } from "../controllers/app.controller.js";
const router = express.Router();

router.get('/get-setting', getSetting);
router.post('/change-setting', changeSetting);
router.post('/init', initData);
router.get('/get-code', getCode);
router.post('/check-code', checkCode);
export default router;
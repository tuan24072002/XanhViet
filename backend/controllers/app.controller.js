import cloudinary from "../lib/cloudinary.js";
import appModel from "../model/app.model.js";
export const initData = async (req, res) => {
    try {
        await appModel.deleteMany({});
        const newCode = Math.floor(100000 + Math.random() * 900000).toString();
        const appData = {
            logo: "https://lzd-img-global.slatic.net/g/p/d60a898dea9a305074407a607843da06.jpg_720x720q80.jpg",
            backgroundColor: "#FEFBF4",
            textHeaderColor: "#333",
            textTitleColor: "#333",
            textColor: "#384252",
            highlightColor: "#cd9a54",
            borderColor: "#ede0cc",
            textDescColor: "#364153",
            codeSecurity: newCode
        }
        const create = await appModel.create(appData);
        return res.status(200).json({
            success: true,
            message: 'Init data successfully!',
            data: create
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export const getSetting = async (req, res) => {
    try {
        const updateBackground = await appModel.findOne();
        return res.status(200).json({
            success: true,
            message: 'Get setting successfully!',
            data: updateBackground
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export const changeSetting = async (req, res) => {
    const { backgroundColor, logo, textHeaderColor, highlightColor, textTitleColor, borderColor, textDescColor, textColor } = req.body;
    try {
        let cloudinaryResponse;
        if (logo) {
            cloudinaryResponse = await cloudinary.uploader.upload(logo, { folder: "XanhViet" });
        }
        const update = await appModel.updateMany({
            backgroundColor,
            textHeaderColor,
            highlightColor,
            textTitleColor,
            borderColor,
            textColor,
            textDescColor,
            logo: cloudinaryResponse?.secure_url ? cloudinaryResponse?.secure_url : ''
        });
        if (update) {
            return res.status(200).json({
                success: true,
                message: 'Update successfully',
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export const getCode = async (req, res) => {
    try {
        const newCode = Math.floor(100000 + Math.random() * 900000).toString();
        const update = await appModel.updateMany({ codeSecurity: newCode })
        const find = await appModel.findOne({ codeSecurity: newCode })
        if (update) {
            return res.status(200).json({
                success: true,
                message: 'Get code successfully',
                data: find
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export const checkCode = async (req, res) => {
    const { codeSecurity } = req.body;
    try {
        const check = await appModel.findOne({ codeSecurity })
        if (check) {
            const newCode = Math.floor(100000 + Math.random() * 900000).toString();
            const update = await appModel.updateMany({ codeSecurity: newCode })
            if (update) {
                return res.status(200).json({
                    success: true,
                    message: 'Xác thực mã bảo vệ thành công!',
                });
            }
        } else {
            return res.status(404).json({
                success: true,
                message: 'Mã bảo vệ sai. Vui lòng kiểm tra lại!',
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
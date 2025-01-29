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
            codeSecurity: newCode,
            products: [
                {
                    "name": "Dầu tẩy trang hoa hồng 310ml",
                    "description": "Rose Makeup Removing Oil 310ml",
                    "price": "345,000 đ",
                    "imageSrc": "https://image.cocoonvietnam.com/uploads/Template_Website_Dau_Tay_Trang_310ml_b098c76143.jpg"
                },
                {
                    "name": "Nước tẩy trang hoa hồng 310ml",
                    "description": "Rose Micellar Water 310ml",
                    "price": "245,000 đ",
                    "imageSrc": "https://image.cocoonvietnam.com/uploads/z4372805343245_27ea562aa5cabe55737d80cef8acfcb5_e4d50792fc.jpg"
                },
                {
                    "name": "Nước tẩy trang hoa hồng 140ml",
                    "description": "Rose Micellar Water 140ml",
                    "price": "155,000 đ",
                    "imageSrc": "https://image.cocoonvietnam.com/uploads/z4372805386498_3bd533296846158103cd752a124be5a8_f90a56659b.jpg"
                },
                {
                    "name": "Dầu tẩy trang hoa hồng 310ml",
                    "description": "Rose Makeup Removing Oil 310ml",
                    "price": "345,000 đ",
                    "imageSrc": "https://image.cocoonvietnam.com/uploads/Template_Website_Dau_Tay_Trang_310ml_b098c76143.jpg"
                },
                {
                    "name": "Nước tẩy trang hoa hồng 310ml",
                    "description": "Rose Micellar Water 310ml",
                    "price": "245,000 đ",
                    "imageSrc": "https://image.cocoonvietnam.com/uploads/z4372805343245_27ea562aa5cabe55737d80cef8acfcb5_e4d50792fc.jpg"
                },
                {
                    "name": "Nước tẩy trang hoa hồng 140ml",
                    "description": "Rose Micellar Water 140ml",
                    "price": "155,000 đ",
                    "imageSrc": "https://image.cocoonvietnam.com/uploads/z4372805386498_3bd533296846158103cd752a124be5a8_f90a56659b.jpg"
                }
            ]
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
export const uploadLogo = async (req, res) => {
    const { logo } = req.body;
    try {
        let cloudinaryResponse;
        if (logo) {
            cloudinaryResponse = await cloudinary.uploader.upload(logo, { folder: "XanhViet" });
        }
        const update = await appModel.updateMany({
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
export const changeSetting = async (req, res) => {
    const { backgroundColor, textHeaderColor, highlightColor, textTitleColor, borderColor, textDescColor, textColor } = req.body;
    try {
        const update = await appModel.updateMany({
            backgroundColor,
            textHeaderColor,
            highlightColor,
            textTitleColor,
            borderColor,
            textColor,
            textDescColor
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
export const createProduct = async (req, res) => {
    const products = Array.isArray(req.body) ? req.body : [req.body];
    try {
        const appSetting = await appModel.findOne();

        if (!appSetting) {
            return res.status(404).json({
                success: false,
                message: "AppSetting không tồn tại!"
            });
        }

        appSetting.products.push(...products);
        await appSetting.save();

        return res.status(200).json({
            success: true,
            message: "Thêm sản phẩm thành công!",
            products: products,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getProducts = async (req, res) => {
    try {
        const appSetting = await appModel.findOne();

        if (!appSetting) {
            return res.status(404).json({
                success: false,
                message: "AppSetting không tồn tại!",
            });
        }

        return res.status(200).json({
            success: true,
            products: appSetting.products,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const appSetting = await appModel.findOne();

        if (!appSetting) {
            return res.status(404).json({
                success: false,
                message: "AppSetting không tồn tại!",
            });
        }
        const newProducts = appSetting.products.filter(p => p._id.toString() !== productId);
        if (newProducts.length === appSetting.products.length) {
            return res.status(404).json({
                success: false,
                message: "Sản phẩm không tồn tại!",
            });
        }
        appSetting.products = newProducts;
        await appSetting.save();

        return res.status(200).json({
            success: true,
            message: "Xóa sản phẩm thành công!",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const updateProduct = async (req, res) => {
    const products = Array.isArray(req.body) ? req.body : [req.body];

    try {
        const appSetting = await appModel.findOne();
        if (!appSetting) {
            return res.status(404).json({
                success: false,
                message: "AppSetting không tồn tại!"
            });
        }

        products.forEach((updatedProduct) => {
            const index = appSetting.products.findIndex(p => p._id.toString() === updatedProduct.id);
            if (index !== -1) {
                appSetting.products[index] = { ...appSetting.products[index], ...updatedProduct };
            }
        });

        await appSetting.save();

        return res.status(200).json({
            success: true,
            message: "Cập nhật sản phẩm thành công!",
            products: products
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

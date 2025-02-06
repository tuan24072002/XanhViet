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
            ],
            stories: {
                banner: "https://cocoonvietnam.com/_nuxt/img/footer-image.5d68be7.jpg",
                content: `# COCOON - Mỹ phẩm thuần chay - cho nét đẹp thuần Việt
## **Ý nghĩa thương hiệu**  
Cocoon nghĩa là “cái kén”, cái kén như là “ngôi nhà” để ủ ấp, nuôi dưỡng con sâu nhỏ để đến một ngày sẽ hóa thành nàng bướm xinh đẹp và lộng lẫy.  
Từ ý nghĩa như thế, Cocoon chính là “ngôi nhà” để chăm sóc làn da, mái tóc của người Việt Nam, giúp cho họ trở nên xinh đẹp, hoàn thiện hơn và tỏa sáng theo cách của chính họ.  
Cocoon ra đời với một lý do đơn giản là làm đẹp cho người Việt từ chính những nguồn nguyên liệu gần gũi, quen thuộc...

## **Triết lý**


Chúng tôi là những người yêu thiên nhiên, luôn say đắm trong việc khám phá các nguyên liệu quen thuộc trong đời sống hằng ngày...  
Những thực phẩm này rất giàu vitamin, chất chống oxi hóa và các khoáng chất để tăng cường sức khỏe của làn da...

## **Sứ mệnh**


Chúng tôi được sinh ra để mang lại cho bạn một làn da, một mái tóc luôn khỏe mạnh, trẻ trung và tràn đầy sức sống...  
Hành trình gian nan tìm đến vẻ đẹp thật sự không phải là nhiệm vụ của riêng bạn, chúng tôi sẽ cùng bạn đi trên hành trình đó...  

## **Cam kết**

### **100% nguyên liệu có nguồn gốc rõ ràng và an toàn cho làn da:** đây là lời hứa và cam kết tuyệt đối của chúng tôi...  
### **100% thuần chay:** chúng tôi không sử dụng các nguyên liệu có nguồn gốc từ động vật...  
### **100% không bao giờ thử nghiệm trên động vật:** các công thức mỹ phẩm của Cocoon được nghiên cứu và được thử nghiệm...  

## **Cam kết luôn đi đôi với hành động**

COCOON rất vinh dự là thương hiệu mỹ phẩm Việt Nam đầu tiên được thông qua trong chương trình Leaping Bunny...  

Cocoon tự hào là thương hiệu mỹ phẩm 100% sản xuất tại Việt Nam
Giá trị thương hiệu  
The COCOON ORIGINAL VIETNAM believes that beauty products should be cruelty free...  

For more information about Cruelty Free International, Leaping Bunny and Leaping Bunny criteria, please visit [www.crueltyfreeinternational.org](www.crueltyfreeinternational.org).`
            },
            banner: [
                "https://wisebusiness.edu.vn/wp-content/uploads/2023/04/chien-luoc-marketing-cua-cocoon-thanh-phan.jpg",
                "https://cf.shopee.vn/file/38924b9daade5d897d0bc5ae0e32b4a7",
                "https://file.hstatic.net/200000223113/collection/20210615._head_banner_web__b8093e15a30d434c98f7623b1e48314c.jpg"
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
        for (let product of products) {
            if (product.imageSrc) {
                try {
                    const uploadResponse = await cloudinary.uploader.upload(product.imageSrc, {
                        folder: "XanhViet",
                    });
                    product.imageSrc = uploadResponse.secure_url;
                } catch (error) {
                    console.error("Lỗi khi upload ảnh lên Cloudinary:", error.message);
                    return res.status(500).json({
                        success: false,
                        message: "Lỗi khi upload ảnh",
                    });
                }
            }
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
            data: appSetting.products,
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
        const { _id } = req.params;
        const appSetting = await appModel.findOne();

        if (!appSetting) {
            return res.status(404).json({
                success: false,
                message: "AppSetting không tồn tại!",
            });
        }
        const deleteImage = appSetting.products.find(p => p._id.toString() === _id)
        if (deleteImage) {
            const publicId = deleteImage.imageSrc.split("/").pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy(`XanhViet/${publicId}`)
            } catch (error) {
                console.log("Error in deleting image from cloudinary", error.message);
                res.status(500).json({ message: "Server error", error: error.message })
            }
        }
        const newProducts = appSetting.products.filter(p => p._id.toString() !== _id);
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

        const updatePromises = products.map(async (updatedProduct) => {
            const existingProduct = appSetting.products.find(p => p._id.toString() === updatedProduct._id);
            if (updatedProduct.imageSrc && updatedProduct.imageSrc !== existingProduct.imageSrc) {
                const publicId = existingProduct.imageSrc.split("/").pop().split(".")[0];
                try {
                    await cloudinary.uploader.destroy(`XanhViet/${publicId}`);
                } catch (error) {
                    console.log("Error in deleting image from cloudinary", error.message);
                    return res.status(500).json({ message: "Server error", error: error.message });
                }
                try {
                    const uploadResponse = await cloudinary.uploader.upload(updatedProduct.imageSrc, {
                        folder: "XanhViet",
                    });
                    updatedProduct.imageSrc = uploadResponse.secure_url;
                } catch (error) {
                    console.error("Lỗi khi upload ảnh lên Cloudinary:", error.message);
                    return res.status(500).json({
                        success: false,
                        message: "Lỗi khi upload ảnh",
                    });
                }
            }
            const index = appSetting.products.findIndex(p => p._id.toString() === updatedProduct._id);
            if (index !== -1) {
                appSetting.products[index] = { ...appSetting.products[index], ...updatedProduct };
            }
        });
        await Promise.all(updatePromises);

        await appSetting.save();

        return res.status(200).json({
            success: true,
            message: "Cập nhật sản phẩm thành công!",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateStory = async (req, res) => {
    try {
        const { stories } = req.body;
        const update = await appModel.updateMany({
            'stories.content': stories
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
            message: error.message,
        });
    }
}

export const updateBanner = async (req, res) => {
    try {
        const { banner } = req.body;
        const updatedUrls = [];
        for (const item of banner) {
            if (item.startsWith('data:image')) {
                const uploadResponse = await cloudinary.uploader.upload(item, {
                    folder: "XanhViet",
                });
                updatedUrls.push(uploadResponse ? uploadResponse.secure_url : "");
            } else {
                updatedUrls.push(item);
            }
        }
        await appModel.updateMany(
            { banner: updatedUrls }
        );
        return res.status(200).json({ message: "Cập nhật banner thành công." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server." });
    }
};

export const updateBannerStory = async (req, res) => {
    try {
        const { banner } = req.body;
        let updatedUrls = "";
        if (banner.startsWith('data:image')) {
            const uploadResponse = await cloudinary.uploader.upload(banner, {
                folder: "XanhViet",
            });
            updatedUrls = uploadResponse ? uploadResponse.secure_url : "";
        } else {
            updatedUrls = banner;
        }
        await appModel.updateMany(
            { 'stories.banner': updatedUrls }
        );
        return res.status(200).json({ message: "Cập nhật banner thành công." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server." });
    }
};

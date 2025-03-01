import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
        default: ""
    },
    price: {
        type: String,
        required: true,
    },
    imageSrc: {
        type: String,
        required: true,
    }
});
const appSchema = new mongoose.Schema(
    {
        logo: {
            type: String,
            required: false,
            default: "",
        },
        backgroundColor: {
            type: String,
            required: true,
            default: "",
        },
        textTitleColor: {
            type: String,
            required: true,
            default: "",
        },
        textDescColor: {
            type: String,
            required: true,
            default: "",
        },
        textColor: {
            type: String,
            required: true,
            default: "",
        },
        borderColor: {
            type: String,
            required: true,
            default: "",
        },
        textHeaderColor: {
            type: String,
            required: true,
            default: "",
        },
        highlightColor: {
            type: String,
            required: true,
            default: "",
        },
        codeSecurity: {
            type: String,
        },
        products: [productSchema],
        stories: {
            banner: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            }
        },
        banner: {
            type: [String],
            default: []
        },
        twoFa: {
            twofa_otp: {
                type: Boolean,
                default: false
            },
            secret: {
                type: String,
            },
            two_fa_qr_url: {
                type: String
            }
        }
    },
    {
        timestamps: true
    }
)

const appModel = mongoose.model('AppSetting', appSchema)
export default appModel
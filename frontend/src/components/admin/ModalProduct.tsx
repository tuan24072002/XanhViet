import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { FormikErrors, useFormik } from "formik";
import { actions } from "@/types";
import React, { useCallback, useEffect } from "react";
import { ProductModel } from "@/model/App.model";
import { CloudUpload, Pencil, Plus, Trash2 } from "lucide-react";
import DialogForm from "../DialogForm";
import { changeAction, createProduct, deleteProduct, updateProduct } from "@/slice/app.slice";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils";
const ModalProduct = ({ isOpenDialog, setIsOpenDialog }: {
    isOpenDialog: boolean,
    setIsOpenDialog: (e: boolean) => void,
}) => {
    const dispatch = useAppDispatch();
    const appState = useAppSelector(state => state.app);
    const disabledInput = !["INS", "UPD"].includes(appState.action)
    const onDrop = useCallback((acceptedFiles: any) => {
        acceptedFiles.forEach((file: File) => {
            const reader = new FileReader();
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                const base64String = reader.result;
                formik.setFieldValue("imageSrc", base64String);
            }
            reader.readAsDataURL(file)
        })
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    const formik = useFormik<ProductModel>({
        initialValues: ProductModel.initial(),
        validate: (data) => {
            const errors: FormikErrors<ProductModel> = {};
            if (!data.name) {
                errors.name = 'Vui lòng nhập tên sản phẩm'
            }
            if (!data.price) {
                errors.price = 'Vui lòng nhập giá sản phẩm'
            }
            if (!data.imageSrc) {
                errors.imageSrc = 'Vui lòng chọn hình sản phẩm'
            }
            return errors;
        },
        onSubmit: async (data) => {
            const payload = {
                _id: appState.action !== 'INS' ? data._id : undefined,
                name: data.name,
                price: data.price,
                description: data.description,
                imageSrc: data.imageSrc,
            }
            switch (appState.action) {
                case 'INS':
                    dispatch(createProduct(payload))
                    break;
                case 'UPD':
                    dispatch(updateProduct(payload))
                    break;
                case 'DEL':
                    dispatch(deleteProduct(payload))
                    break;
            }
        }
    });
    const handleActionClick = (action: actions) => {
        dispatch(changeAction(action));
        formik?.resetForm();
    }
    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            const base64String = reader.result as string;
            formik.setFieldValue("imageSrc", base64String);
        };

        reader.onerror = (error) => {
            console.error("Error reading file:", error);
        };

        reader.readAsDataURL(file);
    };
    useEffect(() => {
        if (appState.itemProduct) {
            formik.setValues(appState.itemProduct);
        }
    }, [appState.itemProduct]);
    return (
        <>
            <DialogForm
                onsubmit={formik?.handleSubmit}
                onClick={() => handleActionClick('INS')}
                iconFooter={appState.action === 'INS' ? Plus : appState.action === 'UPD' ? Pencil : Trash2}
                titleButton={<><Plus />Thêm</>}
                classNameButton="w-fit bg-green-500 hover:bg-green-600 cursor-pointer flex items-center gap-1 p-2 absolute right-4 top-4"
                titleHeader={appState.action === 'INS' ? 'Thêm sản phẩm mới' : appState.action === 'UPD' ? 'Cập nhật sản phẩm' : 'Xóa sản phẩm'}
                actions={appState.action}
                isOpen={isOpenDialog}
                setIsOpen={setIsOpenDialog}
                titleButtonFooter={appState.action === 'INS' ? 'Thêm' : appState.action === 'UPD' ? 'Lưu' : 'Xóa'}
                classNameDialog='max-w-3xl'
                body={
                    <div className="flex flex-col gap-2">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="name" className="text-text">Tên sản phẩm</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formik.values.name}
                                    onChange={(e) => formik.setFieldValue('name', e.target.value)}
                                    disabled={disabledInput}
                                    className="focus-visible:border-highlight"
                                    placeholder="Nhập tên sản phẩm"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="name" className="text-text">Tên phụ sản phẩm</Label>
                                <Input
                                    type="text"
                                    name="subName"
                                    id="subName"
                                    value={formik.values.subName}
                                    onChange={(e) => formik.setFieldValue('name', e.target.value)}
                                    disabled={disabledInput}
                                    className="focus-visible:border-highlight"
                                    placeholder="Nhập tên sản phẩm"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="price" className="text-text">Giá sản phẩm</Label>
                            <Input
                                type="text"
                                name="price"
                                id="price"
                                value={formik.values.price}
                                onChange={(e) => formik.setFieldValue('price', e.target.value)}
                                disabled={disabledInput}
                                className="focus-visible:border-highlight"
                                placeholder="Nhập giá sản phẩm"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="description" className="text-text">Mô tả sản phẩm</Label>
                            <Textarea
                                name="description"
                                id="description"
                                rows={4}
                                value={formik.values.description}
                                onChange={(e) => formik.setFieldValue('description', e.target.value)}
                                disabled={disabledInput}
                                className="focus-visible:border-highlight outline-none"
                                placeholder="Nhập mô tả sản phẩm"
                            />
                        </div>
                        <div className={cn("text-sm w-full flex flex-col gap-2")}>
                            <Label className="text-text">Hình ảnh sản phẩm</Label>
                            <div className={disabledInput ? 'cursor-not-allowed' : ''}
                                style={{
                                    cursor: disabledInput ? 'not-allowed!important' : 'pointer'
                                }}
                            >
                                <label htmlFor="file" className={cn(`w-full text-center col-span-8`, disabledInput ? 'cursor-not-allowed' : '')}  {...getRootProps()}>
                                    {
                                        isDragActive ? <div
                                            className="px-6 py-8 border-2 h-full max-h-[152px] border-highlight border-dashed rounded-md cursor-pointer flex flex-col justify-center items-center">
                                            <CloudUpload className="size-8 text-text" />
                                            <p className="text-sm text-highlight mt-2">Thả hình ảnh vào đây</p>
                                            <em className="text-xs text-text mt-2">(Chỉ chấp nhận tệp .jpg .png .gif)</em>
                                        </div> : formik.values.imageSrc
                                            ? <div className={cn("p-2 border-2 h-[152px] border-highlight border-dashed rounded-md cursor-pointer flex flex-col justify-center items-center", disabledInput ? 'cursor-not-allowed' : '')}>
                                                <img src={formik.values.imageSrc} alt="Image Product" className={cn("size-full object-contain", disabledInput ? 'cursor-not-allowed' : '')} />
                                            </div>
                                            : <div
                                                className="px-6 py-8 border-2 h-full max-h-[152px] border-highlight border-dashed rounded-md cursor-pointer flex flex-col justify-center items-center">
                                                <CloudUpload className="size-8 text-text" />
                                                <p className="text-sm text-text mt-2">Kéo hình ảnh vào đây, hoặc click để chọn hình ảnh</p>
                                                <em className="text-xs text-text mt-2">(Chỉ chấp nhận tệp .jpg .png .gif)</em>
                                            </div>
                                    }
                                    <input {...getInputProps} hidden id="file" type="file" value={''} onChange={handleChangeImage} disabled={disabledInput} />
                                </label>
                            </div>
                        </div>
                    </div>
                } />
        </>
    )
}

export default ModalProduct
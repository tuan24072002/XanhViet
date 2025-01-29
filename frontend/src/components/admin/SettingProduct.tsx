import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/hooks";
import { Pen } from "lucide-react";
const SettingProduct = () => {
    const appState = useAppSelector(state => state.app);
    const [products, setProducts] = useState(appState.item.products);
    useEffect(() => {
        setProducts(appState.item.products);
    }, [appState.item.products])
    console.log({ products });

    return (
        <div className="h-full overflow-y-auto">
            <div className="flex overflow-auto scroll-hidden items-center gap-2 flex-1">
                {
                    products.map((product) => (
                        <div
                            key={product.id}
                            className="rounded-[8px] flex flex-col shrink-0 group relative"
                        >
                            <div className="w-[350px] h-[385px]">
                                <img
                                    src={product.imageSrc}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded"
                                />
                            </div>
                            <div className="flex-1 space-y-2 px-2 pt-2">
                                <div className="space-y-1">
                                    <h2 className="font-semibold text-textTitle">{product.name}</h2>
                                    <p className="text-textDesc text-sm">{product.description}</p>
                                </div>
                                <p className="text-sm font-medium text-textTitle">{product.price}</p>
                            </div>
                            <button className="border cursor-pointer py-2 px-2 rounded bg-highlight text-white absolute top-2 right-2 group-hover:opacity-100 opacity-0 transition-all duration-300">
                                <Pen className="" />
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SettingProduct
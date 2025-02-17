import { ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"
import { useAppSelector } from "@/app/hooks"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { ProductModel } from "@/model/App.model"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

const Product = () => {
    const navigate = useNavigate()
    const appState = useAppSelector(state => state.app)
    const [products, setProducts] = useState(appState.listProduct)

    useEffect(() => {
        setProducts(appState.listProduct)
    }, [appState.listProduct])

    const handleBuyNow = (product: ProductModel) => {
        const productCart = localStorage.getItem('productCart')
        let arr = productCart ? JSON.parse(productCart) : []

        const existingProduct = arr.find((item: any) => item._id === product._id)

        if (existingProduct) {
            arr = arr.map((item: any) =>
                item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
            )
        } else {
            arr.push({ ...product, quantity: 1 })
        }

        localStorage.setItem('productCart', JSON.stringify(arr))
        window.dispatchEvent(new Event("cartUpdated"))
        navigate('/cart')
    }

    return (
        <div className="h-full">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
                    {products?.length > 0 && products.map((product) => (
                        <Card
                            key={product._id}
                            className="h-full overflow-hidden hover:shadow-lg transition-all duration-300"
                        >
                            <CardHeader className="p-0">
                                <div className="relative h-48 overflow-hidden group">
                                    <img
                                        src={product.imageSrc}
                                        alt={product.name}
                                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transform transition-all duration-500"
                                    />
                                    <Badge className="absolute top-3 right-3 bg-highlight/90 hover:bg-highlight">New</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-2">
                                <div
                                    onClick={() => navigate(`/product/${product._id}`)}
                                >
                                    <h3 className="font-semibold text-lg text-textTitle mb-1 line-clamp-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-text text-sm mb-2 line-clamp-2">
                                        {product.description}
                                    </p>
                                    <p className="text-highlight font-bold text-lg">
                                        {product.price}
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="p-2 pt-0">
                                <Button
                                    onClick={() => handleBuyNow(product)}
                                    className="w-full bg-highlight hover:bg-highlight/90 cursor-pointer"
                                >
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    Mua ngay
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Product
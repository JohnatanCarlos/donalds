import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductHeader from "./components/product-header";
import ProductDetails from "./components/product-details";

interface ProductPageProps {
    params: Promise<{slug: string, productId: string}>
}

const ProductPage = async ({params}: ProductPageProps) => {
    const { slug, productId } = await params;
    

    const products = await db.product.findUnique({where: {id: productId}, include: {restaurant: true}});
    if(!products) {
        return notFound();
    }

    if(products.restaurant.slug.toUpperCase !== slug.toUpperCase) {
        return notFound();
    }

    return (  
        <div className="flex flex-col h-full">
            <ProductHeader product={products} />
            <ProductDetails product={products} />
        </div>
               
    );
}
 
export default ProductPage;
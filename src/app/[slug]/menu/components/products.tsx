import { Product } from "@prisma/client";
import Image from 'next/image';
import Link from "next/link";
import { useParams } from "next/navigation";

interface ProductsProps { 
    products: Product[];
}

const Products = ({products}: ProductsProps)  => {
    const {slug} = useParams<{slug: string}>();

    return ( 
        <div className="space-y-3 px-5">
            {products.map((product) => (
                <Link href={`/${slug}/menu/${product.id}`} key={product.id} className="flex justify-between items-center gap-10 py-3 border-b">
                    <div>
                        <h3 className="text-sm font-semibold">{product.name}</h3>
                        <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
                        <p className="pt-3 text-md font-semibold">{new Intl.NumberFormat("pt-BR", 
                            {style: "currency", currency: "BRL"}).format(product.price)}</p>
                    </div>

                    <div className="relative  min-w-[82px] min-h-[82px] p-2">
                        <Image src={product.imageUrl} alt={product.name} fill className="rounded-lg object-contain bg-gray-200"/>
                    </div>
                </Link>
            ))}
        </div>
    );
}
 
export default Products;
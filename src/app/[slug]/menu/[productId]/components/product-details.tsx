"use client"

import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import { ChefHatIcon, MinusIcon, PlusIcon } from "lucide-react";
import Image from 'next/image';
import { useState } from "react";

interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{
        include: { restaurant: true } 
    }>
}

const ProductDetails = ({product}: ProductDetailsProps) => {
    const [quantity, setQuantity] = useState<number>(1);
    const handleIncrement = () => setQuantity(quantity + 1);
    const handleDecrement = () => setQuantity(quantity > 0 ? quantity - 1 : 0);

    return (  
        <div className="relative flex flex-col flex-auto z-50 mt-[-1.5rem] rounded-t-3xl border bg-white p-5">
            <div className="flex-auto">
                <div className="flex items-center gap-2">
                    <Image src={product.restaurant.avatarImageUrl} alt={product.restaurant.name} width={16} height={16} className="rounded-full"/>
                    <p className="text-muted-foreground text-sm opacity-55">{product.restaurant?.name}</p>
                </div>

                <div className="mt-2">
                    <h3 className="text-sm font-semibold">{product.name}</h3>
                    

                    <div className="flex items-center justify-between mt-2">
                        <h4 className="pt-3 text-md font-semibold">
                            { new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(product.price) }
                        </h4>

                        <div className="flex items-center gap-2">
                            <Button variant="secondary" size="sm" className="rounded-lg" onClick={handleDecrement}>
                                <MinusIcon />
                            </Button>
                            <p className="w-4 text-center">{ quantity }</p>
                            <Button variant="destructive" size="sm" className="rounded-lg" onClick={handleIncrement}>
                                <PlusIcon />
                            </Button>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3">
                        <h5 className="font-semibold">Sobre</h5>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-1.5">
                            <ChefHatIcon size={18}/>
                            <h5 className="font-semibold">Ingrediente</h5>
                        </div>
                        
                        <ul className="list-disc text-sm text-muted-foreground ml-6">
                            {product.ingredients.map((ingredient) => (
                                <li key={ingredient}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
            
            <Button variant="default" className="w-full rounded-full mt-6">Adicionar à sacola</Button>
        </div>
    );
}
 
export default ProductDetails;
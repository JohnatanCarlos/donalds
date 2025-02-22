"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from 'next/image';
import { useRouter } from "next/navigation";


interface ProductHeaderProps {
    product: Product;
}

const ProductHeader = ({product}: ProductHeaderProps) => {
    const router = useRouter();
    const handleBackClick = () => router.back();

    return ( 
        <div className="relative h-[300px] w-full bg-gray-200">
            <Button 
                variant="secondary" 
                size="icon" 
                className="absolute top-4 left-4 z-50 rounded-full" 
                onClick={() => handleBackClick()}>
                <ChevronLeftIcon />
            </Button>

            <Button variant="secondary" size="icon" className="absolute top-4 right-4 z-50 rounded-full">
                <ScrollTextIcon />
            </Button>
            
            <Image src={product.imageUrl} alt={product.name} fill className="object-contain"/>
        </div>
    );
}
 
export default ProductHeader;
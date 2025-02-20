"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Prisma } from "@prisma/client";
import { ClockIcon, StarIcon } from "lucide-react";
import Image from 'next/image';
import { useState } from "react";
import Products from "./products";

interface RestaurantCategoriesProps {
    restaurant: Prisma.RestaurantGetPayload<{
        include: {  menuCategory: { include: { product: true } } }
    }>;
}

type MenuCategoryWithProduct = Prisma.MenuCategoryGetPayload<{
    include: { product: true }
}>

const RestaurantCategories = ({restaurant}: RestaurantCategoriesProps) => {
    const [selectedCategory, setSelectedCategory] = useState<MenuCategoryWithProduct>(restaurant.menuCategory[0]);
    const handleCategoryClick = (category: MenuCategoryWithProduct) => {
        setSelectedCategory(category);
    };
    const getCategoryButtonVariant = (category: MenuCategoryWithProduct) => {
        return selectedCategory.id == category.id ? "default" : "secondary";
    };


    return (  
        <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl border bg-white">
            <div className="p-5">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                        <Image src={restaurant.avatarImageUrl} alt={restaurant.name} width={45} height={45}/>
                        <div>
                            <p className="text-lg font-semibold">{restaurant.name}</p>
                            <p className="text-sm opacity-55">Fast food</p>
                        </div>
                    </div>

                    <div className="flex justify-end items-center gap-1">
                        <StarIcon className="text-primary" />
                        <p className="font-semibold">5.0</p>
                    </div>
                </div>

                <div className="flex items-center gap-1 text-green-500 mt-3">
                    <ClockIcon size={20}/>
                    <p className="text-sm">Aberto</p>
                </div>
            </div>

            <ScrollArea className="w-full">
                <div className="flex w-max space-x-4 p-5 pt-0">
                    {restaurant.menuCategory.map((category) => (
                        <Button 
                            key={category.id} 
                            variant={getCategoryButtonVariant(category)}
                            size="sm" 
                            className="rounded-full"
                            onClick={() => handleCategoryClick(category)}>
                            {category.name}
                        </Button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <h3 className="font-semibold px-5 pt-2">{selectedCategory.name}</h3>
            <Products products={selectedCategory.product} />
        </div>
    );
}
 
export default RestaurantCategories;
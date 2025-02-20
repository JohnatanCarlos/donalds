"use server"

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";
import { notFound } from "next/navigation";
import RestaurantHeader from "./components/header";

interface MenuPageProps {
    params: Promise<{slug: string}>
    searchParams: Promise<{consumptionMethod: string}>
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
    return ['IN_LOCAL', 'TAKEAWAY'].includes(consumptionMethod.toUpperCase());
}

const MenuPage = async ({params, searchParams}: MenuPageProps) => {
    const {slug} = await params;
    const {consumptionMethod} = await searchParams;

    if(!isConsumptionMethodValid(consumptionMethod)) {
        return notFound();
    }

    const restaurant = await getRestaurantBySlug(slug);
    if(!restaurant) {
        return notFound();
    }

    return ( 
       <div>
            <RestaurantHeader restaurant={restaurant} />
       </div>
    );
}
 
export default MenuPage;
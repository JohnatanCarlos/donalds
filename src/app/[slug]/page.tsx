"use server"

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";
import { notFound } from "next/dist/client/components/navigation";
import Image from 'next/image';
import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
    params: Promise<{slug: string}>
}

const RestaurantPage = async ({params}: RestaurantPageProps) => {
    const {slug} = await params;
    const restaurant = await getRestaurantBySlug(slug);
    if(!restaurant) { 
        return notFound();
    }

    return ( 
        <div className="flex flex-col h-screen items-center justify-center px-6 pt-24">
            <div className="flex flex-col items-center gap-2">
                <Image src={restaurant?.avatarImageUrl} alt={restaurant?.name} width={82} height={82} />
                <h2 className="font-semibold">{restaurant.name}</h2>
            </div>

            <div className="text-center space-y-2 pt-24 ">
                <h3 className="font-semibold text-2xl">
                    Seja bem-vindo!
                </h3>
                <p className="opacity-55">
                    Escolhas como aproveita sua refeição.
                    Estamos aqui para oferecer praticidade e sabor em cada detalhe.
                </p>
            </div>
        
            <div className="pt-14 grid grid-cols-2 gap-4">
                <ConsumptionMethodOption
                    slug={slug}
                    imageUrl="/in_local.png"
                    imageAlt="comer no local"
                    buttonText="Para comer aqui"
                    option="IN_LOCAL"
                />

                <ConsumptionMethodOption
                    slug={slug}
                    imageUrl="/takeaway.png"
                    imageAlt="para levar"
                    buttonText="Para levar"
                    option="TAKEAWAY"
                />
            </div>
        </div>
    );
}
 
export default RestaurantPage;
import { db } from "@/lib/prisma";

export const getRestaurantBySlug = async (slug: string) => {
  const restaurant = await db.restaurant.findFirst({ where: { slug } });
  return restaurant;
}

export const getRestaurantBySlugWithCategoriesAndProducts = async (slug: string) => {
  const restaurant = await db.restaurant.findFirst({
    where: { slug },
    include: { 
      menuCategory: {
        include: { product: true }
    }}
  });
  
  return restaurant;
}
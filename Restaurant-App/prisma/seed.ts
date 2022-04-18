import { categories } from "./data/Category";
import { products } from "./data/Product";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async ( ) : Promise<void> => {
  try {
    await prisma.product.createMany({
      data: products,
    });
   } catch (error) {
    throw error;
  }
};

main();

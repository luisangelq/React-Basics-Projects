import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getCategories = async (req, res) => {
  const categories = await prisma.category.findMany()
  res.status(200).json(categories)
}

export default getCategories
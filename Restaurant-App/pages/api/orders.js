import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();

  if (req.method === "GET") {
    const orders = await prisma.order.findMany();
    res.json(orders);
  }
  if (req.method === "POST") {
    console.log(req.body);
    //add to database
    const order = await prisma.order.create({
      data: {
        name: req.body.name,
        total: req.body.total,
        products: req.body.products,
        createdAt: req.body.createdAt,
      },
    });
    res.json(order);
  }
};

export default handler;

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prismaClient";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") || "";
  console.log(query);
  const products = await prisma.product.findMany({
    where: {
      name: { contains: query, mode: "insensitive" },
    },
  });
  return NextResponse.json(products);
}

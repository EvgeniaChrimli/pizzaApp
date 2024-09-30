import { notFound } from "next/navigation";
import { prisma } from "../../../../../prisma/prismaClient";
import { Container, GroupVariants, Title } from "@/components/ui/shared";
import { ProductImage } from "@/components/ui/shared/productImage";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } });
  if (!product) {
    return notFound();
  }
  return (
    <Container className="flex flex-col my-10">
      <div className="flex mt-20">
        <ProductImage image={product.imageUrl} size={20} />
        <div className="w-[490px] p-7 bg-[#FCFCFC]">
          <Title
            text={product.name}
            size="md"
            className="font-extrabold mb-1"
          />
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <GroupVariants
            selectedValue="2"
            items={[
              {
                name: "Маленькая",
                value: "1",
              },
              {
                name: "Средняя",
                value: "2",
              },
              {
                name: "Большая",
                value: "3",
              },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}

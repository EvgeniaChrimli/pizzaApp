"use client";
import React from "react";
import { Title } from "./title";
import { cn } from "@/lib/utils";
import { ProductCard } from "./productCard";
import { useIntersection } from "react-use";
import { useCategoryStore } from "../../../../store/category";

interface Props {
  title: string;
  items: any[];
  categoryId: number;
  listClassname?: string;
  classname?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  categoryId,
  listClassname,
  classname,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });
  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);
  return (
    <div className={classname} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mt-5" />

      <div className={cn("grid grid-cols-3 gap-[50px]", listClassname)}>
        {items.map((product, index) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items.price}
          />
        ))}
      </div>
    </div>
  );
};

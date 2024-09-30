"use client";
import { cn } from "@/lib/utils";
import * as React from "react";
import { useCategoryStore } from "../../../../store/category";
import { Category } from "@prisma/client";

interface Props {
  items: Category[];
  classname?: string;
}

export const Categories: React.FunctionComponent<Props> = ({
  items,
  classname,
}) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl ", classname)}
    >
      {items.map(({ name, id }, index) => (
        <a
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            categoryActiveId === id &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          key={index}
          href={`#/${name}`}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};

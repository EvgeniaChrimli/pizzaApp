import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui/button";

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  classname?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  classname,
}) => {
  return (
    <div className={classname}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h=[260px]">
          <img className="w-[216px] h=[216px]" src={imageUrl} alt={name} />
        </div>
        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
        <p className="text-sm text-gray-400">
          Цыпленок, моцарелла, сыр чеддер,сырный соус, томаты,чеснок
        </p>
        <div className="flex justify-between items-crnter mt-4">
          <span className="text-[20px]">
            от <b>{price}руб.</b>
          </span>
          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className=" mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};

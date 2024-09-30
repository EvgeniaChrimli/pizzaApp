"use client";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useClickAway, useDebounce } from "react-use";
import { Api } from "../../../../services/apiClient";
import { Product } from "@prisma/client";

interface Props {
  classname?: string;
}

export const SearchInput: React.FC<Props> = ({ classname }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);
  const ref = React.useRef(null);
  useClickAway(ref, () => {
    setFocused(false);
  });
  useDebounce(
    () => {
      Api.products.search(searchQuery).then((items) => setProducts(items));
    },
    100,
    [searchQuery]
  );
  const onClickItem = () => {
    setSearchQuery("");
    setFocused(false);
    setProducts([]);
  };
  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />
      )}
      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11",
          classname
        )}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          className="rounded-2xl outline-none w-full bg-gray-50 pl-11"
          type="text"
          placeholder="Найти пиццу..."
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div
          className={cn(
            "absolute w-full bg-white rounded-xl py-2 mt-5 shadow-md transition-all duration-200 invisible opacity-0 z-30",
            focused && "visible opacity-100 top-12"
          )}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              onClick={onClickItem}
            >
              <div className="px-3 py-2 hover:bg-primary/10">
                {product.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

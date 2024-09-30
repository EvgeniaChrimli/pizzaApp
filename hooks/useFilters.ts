import { useRouter, useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React from "react";
interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}
interface QueryFilters extends PriceProps {
  types: string;
  sizes: string;
  ingredients: string;
}
export interface Filters {
  types: Set<string>;
  sizes: Set<string>;
  selectedIngredients: Set<string>;
  price: PriceProps;
}
interface ReturnProps extends Filters {
  setPrice: (name: keyof PriceProps, value: number) => void;
  setPizzaTypes: (key: string) => void;
  setSizes: (key: string) => void;
  setSelectedIngredients: (key: string) => void;
}
export const useFilter = (): ReturnProps => {
  const serchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(serchParams.get("ingredients")?.split(","))
  );

  const [sizes, { toggle: toogleSizes }] = useSet(
    new Set<string>(
      serchParams.has("sizes") ? serchParams.get("sizes")?.split(",") : []
    )
  );
  const [types, { toggle: tooglePizzaTypes }] = useSet(
    new Set<string>(
      serchParams.has("types") ? serchParams.get("types")?.split(",") : []
    )
  );
  const [price, setPrice] = React.useState<PriceProps>({
    priceFrom: Number(serchParams.get("priceFrom")) || undefined,
    priceTo: Number(serchParams.get("priceTo")) || undefined,
  });
  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    sizes,
    types,
    price,
    selectedIngredients,
    setPrice: updatePrice,
    setPizzaTypes: tooglePizzaTypes,
    setSizes: toogleSizes,
    setSelectedIngredients: toggleIngredients,
  };
};

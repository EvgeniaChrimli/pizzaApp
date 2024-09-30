import React from "react";
import { Filters } from "./useFilters";
import qs from "qs";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  React.useEffect(() => {
    const params = {
      ...filters.price,
      pizzaTypes: Array.from(filters.types),
      pizzaSizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    };

    const querySrting = qs.stringify(params, {
      arrayFormat: "comma",
    });
    router.push(`?${querySrting}`, {
      scroll: false,
    });
  }, [filters, router]);
};

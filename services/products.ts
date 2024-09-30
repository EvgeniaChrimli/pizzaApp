import { Product } from "@prisma/client";
import { instance } from "./axios";
import { ApiRoutes } from "./constants";

export const search = async (query: string): Promise<Product[]> => {
  return (
    await instance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {
      params: { query },
    })
  ).data;
};

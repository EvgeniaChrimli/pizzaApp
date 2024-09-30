import { Ingredient } from "@prisma/client";
import { instance } from "./axios";
import { ApiRoutes } from "./constants";

export const getAllProduct = async (): Promise<Ingredient[]> => {
  return (await instance.get<Ingredient[]>(ApiRoutes.INGREDIENTS, {})).data;
};

import { cn } from "@/lib/utils";
import * as React from "react";
import { Container } from "./container";
import { Categories } from "./categories";
import { SortPopup } from "./sortPopup";
import { Category } from "@prisma/client";
interface Props {
  categories: Category[];
  classname?: string;
}
export const TopBar: React.FunctionComponent<Props> = ({
  categories,
  classname,
}) => {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black-/5 z-10",
        classname
      )}
    >
      <Container className="flex items-center justify-between">
        <Categories items={categories} />
        <SortPopup />
      </Container>
    </div>
  );
};

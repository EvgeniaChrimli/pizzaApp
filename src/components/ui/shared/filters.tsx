"use client";
import * as React from "react";
import { Title } from "./title";
import { Input } from "../ui/input";
import { RangeSlider } from "../ui/rangeSlider";
import { CheckBoxFiltersGroup } from "./checkboxFiltersGroup";
import { useFilter, useQueryFilters, useIngredients } from "../../../../hooks";

interface Props {
  classname?: string;
}

export const Filters: React.FunctionComponent<Props> = ({ classname }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilter();
  useQueryFilters(filters);
  const updatePrice = (price: number[]) => {
    filters.setPrice("priceFrom", price[0]);
    filters.setPrice("priceTo", price[1]);
  };
  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  return (
    <div className={classname}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
      <CheckBoxFiltersGroup
        name="PizzaTypes"
        title="Тип теста"
        classname="mb-5"
        onClickCheckBox={filters.setPizzaTypes}
        selectedIds={filters.types}
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
      />
      <CheckBoxFiltersGroup
        name="Sizes"
        title="Размеры"
        classname="mb-5"
        onClickCheckBox={filters.setSizes}
        selectedIds={filters.sizes}
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7 ">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(filters.price.priceFrom)}
            onChange={(e) =>
              filters.setPrice("priceFrom", Number(e.target.value))
            }
          />
          <Input
            type="number"
            placeholder="1000"
            min={0}
            max={1000}
            value={String(filters.price.priceTo)}
            onChange={(e) =>
              filters.setPrice("priceTo", Number(e.target.value))
            }
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[filters.price.priceFrom || 0, filters.price.priceTo || 1000]}
          onValueChange={updatePrice}
        />
      </div>
      <CheckBoxFiltersGroup
        name="Ingredients"
        title="Ингридиенты"
        classname="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckBox={filters.setSelectedIngredients}
        selectedIds={filters.selectedIngredients}
      />
    </div>
  );
};

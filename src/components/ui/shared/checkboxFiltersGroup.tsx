"use client";

import React from "react";
import { FilterCheckbox, FilterCheckboxProps } from "./filterCheckBox";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

type Item = FilterCheckboxProps;
interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  loading?: boolean;
  selectedIds?: Set<string>;
  searchInputPlaceholder?: string;
  onClickCheckBox?: (id: string) => void;
  defaultValue?: string[];
  name?: string;
  classname?: string;
}
export const CheckBoxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  classname,
  loading,
  onClickCheckBox,
  selectedIds,
  name,
  defaultValue,
}) => {
  const [showAll, setShowAll] = React.useState(false);

  const [search, setSearch] = React.useState("");

  const list = showAll
    ? items.filter((item) =>
        item.text.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    : (defaultItems || items).slice(0, limit);

  const onChangeSearch = (value: string) => {
    setSearch(value);
  };
  if (loading) {
    return (
      <div className={classname}>
        <p className="font-bold mb-3">{title}</p>
        {...Array(limit)
          .fill(0)
          .map((_, index) => <Skeleton className="h-6 mb-4" key={index} />)}
      </div>
    );
  }
  return (
    <div className={classname}>
      <p className="font-bold mb-3">{title}</p>
      {showAll && (
        <div className="mb-5">
          <Input
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
            onChange={(e) => onChangeSearch(e.target.value)}
          />
        </div>
      )}
      <div className="flex flex-col gap-4 max-h-96 pr-2 owerflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selectedIds?.has(item.value)}
            onCheckedChange={() => onClickCheckBox?.(item.value)}
            name={name}
          />
        ))}

        {items.length > limit && (
          <div className={showAll ? "border-t border-t-neutral-100 mt-4 " : ""}>
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-primary mt-5"
            >
              {showAll ? "Скрыть" : "Показать все"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

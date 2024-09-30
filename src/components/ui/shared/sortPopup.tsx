import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
interface Props {
  classname?: string;
}
export const SortPopup: React.FunctionComponent<Props> = ({ classname }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer",
        classname
      )}
    >
      <ArrowDown size={16} />
      <b>Сортировка:</b>
      <b className="text-primary">популярное</b>
    </div>
  );
};

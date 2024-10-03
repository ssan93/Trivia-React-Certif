import { memo } from "react";
import { cn } from "../../../lib/utils";
import { ICategory } from "../../../models/interfaces";

interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
  options: ReadonlyArray<ICategory | string>;
  placeholder: string;
  handleChange: (value: string) => void;
}

export const Select = memo(
  ({
    options,
    className,
    handleChange,
    placeholder,
    ...props
  }: SelectProps) => {
    return (
      <div className="w-[300px]">
        <select
          {...props}
          onChange={(e) => handleChange(e.target.value)}
          className={cn("w-full border p-2", className)}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => {
            const { id, name } =
              typeof option === "string"
                ? { id: option, name: option }
                : option;
            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </select>
      </div>
    );
  },
);

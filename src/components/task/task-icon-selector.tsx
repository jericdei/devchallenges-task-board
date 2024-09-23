"use client";

import { icons } from "@/constants/defaults";
import React, { forwardRef, useEffect, useState } from "react";

interface TaskIconSelectorProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  defaultSelected?: string | null;
}

const TaskIconSelector = forwardRef<HTMLInputElement, TaskIconSelectorProps>(
  ({ defaultSelected, ...props }, ref) => {
    const [selected, setSelected] = useState<string | undefined>();

    useEffect(() => {
      if (defaultSelected && typeof defaultSelected === "string") {
        setSelected(defaultSelected);
      }
    }, [defaultSelected]);

    return (
      <div className="flex flex-col gap-2">
        <span className="input-label">Icon</span>

        <div className="flex gap-3">
          {icons.map((icon) => (
            <React.Fragment key={icon}>
              <input
                type="radio"
                id={icon}
                name="icon"
                ref={ref}
                value={icon}
                {...props}
                hidden
                onChange={(e) => {
                  setSelected(e.target.value);
                  props.onChange?.(e);
                }}
              />

              <label htmlFor={icon} className="space-y-2">
                <div
                  className={`cursor-pointer text-2xl px-4 py-3 rounded-xl ${
                    icon === selected ? "bg-warning-300" : "bg-neutral-200"
                  }`}
                >
                  {icon}
                </div>
              </label>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
);

TaskIconSelector.displayName = "TaskIconSelector";

export default TaskIconSelector;

"use client";

import { icons } from "@/constants/defaults";
import React, { useState } from "react";

export default function TaskIconSelector(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  const [selected, setSelected] = useState<string | undefined>();

  return (
    <div className="flex flex-col gap-2">
      <span className="input-label">Icon</span>

      <div className="flex gap-3">
        {icons.map((icon) => (
          <React.Fragment key={icon}>
            <input
              type="radio"
              name={props.id}
              id={icon}
              value={icon}
              onChange={() => setSelected(icon)}
              hidden
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

"use client";

import { TaskStatuses, TaskStatusesLabel } from "@/db/schema";
import React, { forwardRef, useEffect, useState } from "react";
import CheckIcon from "../vector/check-icon";
import TaskStatusIcon from "./task-status-icon";

interface TaskStatusSelectorProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  defaultSelected?: string | null;
}

const TaskStatusSelector = forwardRef<
  HTMLInputElement,
  TaskStatusSelectorProps
>(({ defaultSelected, ...props }, ref) => {
  const [selected, setSelected] = useState<string | undefined>();

  useEffect(() => {
    if (defaultSelected && typeof defaultSelected === "string") {
      setSelected(defaultSelected);
    } else {
      setSelected(undefined);
    }
  }, [defaultSelected]);

  return (
    <div className="flex flex-col gap-2">
      <span className="input-label">Status</span>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        {TaskStatuses.filter((x) => x !== "TODO").map((status) => (
          <React.Fragment key={status}>
            <input
              type="radio"
              id={status}
              name="status"
              value={status}
              ref={ref}
              {...props}
              hidden
              onChange={(e) => {
                setSelected(e.target.value);
                props.onChange?.(e);
              }}
            />

            <label
              htmlFor={status}
              className="space-y-2"
            >
              <div
                className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-1 text-2xl ${
                  status === selected ? "border-info-700" : "border-neutral-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <TaskStatusIcon status={status} />
                  <p className="text-base">{TaskStatusesLabel[status]}</p>
                </div>

                {status === selected && (
                  <div className="rounded-full bg-info-700 p-1">
                    <CheckIcon />
                  </div>
                )}
              </div>
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});

TaskStatusSelector.displayName = "TaskStatusSelector";

export default TaskStatusSelector;

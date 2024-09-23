"use client";

import { TaskStatuses, TaskStatusesLabel } from "@/db/schema";
import React, { useState } from "react";
import CheckIcon from "../vector/check-icon";
import TaskStatusIcon from "./task-status-icon";

export default function TaskStatusSelector(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  const [selected, setSelected] = useState<string | undefined>();

  return (
    <div className="flex flex-col gap-2">
      <span className="input-label">Status</span>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        {TaskStatuses.filter((x) => x !== "TODO").map((status) => (
          <React.Fragment key={status}>
            <input
              type="radio"
              name={props.id}
              id={status}
              value={status}
              onChange={() => setSelected(status)}
              hidden
            />

            <label htmlFor={status} className="space-y-2">
              <div
                className={`flex items-center justify-between cursor-pointer text-2xl p-1 rounded-xl border-2 ${
                  status === selected ? "border-info-700" : "border-neutral-200"
                }`}
              >
                <div className="flex gap-2 items-center">
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
}

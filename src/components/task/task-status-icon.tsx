"use client";

import { TaskStatus } from "@/db/schema";
import React from "react";
import TimeIcon from "../vector/time-icon";
import DoneIcon from "../vector/done-icon";
import WontDoIcon from "../vector/wont-do-icon";

export default function TaskStatusIcon({ status }: { status: TaskStatus }) {
  let statusStyles: {
    icon: React.ReactElement | null;
    iconBg?: string;
  } = {
    icon: null,
  };

  switch (status) {
    case "TODO":
      statusStyles = { icon: null };
      break;
    case "IN_PROGRESS":
      statusStyles = {
        icon: <TimeIcon />,
        iconBg: "bg-warning-700",
      };
      break;
    case "COMPLETED":
      statusStyles = {
        icon: <DoneIcon />,
        iconBg: "bg-success-700",
      };
      break;
    case "WONT_DO":
      statusStyles = {
        icon: <WontDoIcon />,
        iconBg: "bg-danger-700",
      };
      break;
  }

  return (
    <div className={`p-3 rounded-xl ${statusStyles.iconBg}`}>
      {statusStyles.icon}
    </div>
  );
}

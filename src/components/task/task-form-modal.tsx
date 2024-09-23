"use client";

import { forwardRef } from "react";
import Modal from "../modal";

interface TaskFormModalProps {
  isEdit?: boolean;
  onClose?: () => void;
}

const TaskFormModal = forwardRef<HTMLDialogElement, TaskFormModalProps>(
  ({ onClose, isEdit }, ref) => {
    return (
      <Modal
        title={isEdit ? "Edit task" : "Add new task"}
        dialogRef={ref}
        onClose={onClose}
      >
        <p>Nice</p>
      </Modal>
    );
  }
);

TaskFormModal.displayName = "TaskFormModal";

export default TaskFormModal;

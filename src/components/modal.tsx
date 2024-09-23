"use client";

import CloseIcon from "./vector/close-icon";

interface ModalProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  title: string;
  dialogRef?: React.Ref<HTMLDialogElement>;
  onClose?: () => void;
}

export default function Modal({
  title,
  children,
  dialogRef,
  onClose,
  ...props
}: ModalProps) {
  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    if (
      rect.left > event.clientX ||
      rect.right < event.clientX ||
      rect.top > event.clientY ||
      rect.bottom < event.clientY
    ) {
      onClose?.();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal-animation mr-4 h-full w-1/2 rounded-xl p-8"
      onClick={handleDialogClick}
      {...props}
    >
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="task-title">{title}</h2>

          <button
            className="rounded-lg border border-neutral-200 p-2"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        {children}
      </div>
    </dialog>
  );
}

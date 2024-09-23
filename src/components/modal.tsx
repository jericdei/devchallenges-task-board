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
      className="rounded-xl p-4 w-1/2 h-full mr-4 modal-animation"
      onClick={handleDialogClick}
      {...props}
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="task-title">{title}</h2>

          <button
            className="p-2 rounded-lg border border-neutral-200"
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

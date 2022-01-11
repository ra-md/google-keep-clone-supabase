import React from "react";
import { Dialog } from "@headlessui/react";

interface ModalProps {
  visible: boolean;
  toggle: () => void;
  children: React.ReactNode;
}

export default function Modal({ toggle, children, visible }: ModalProps) {
  return (
    <Dialog
      open={visible}
      as="div"
      className="fixed inset-0 z-40 overflow-y-auto"
      onClose={toggle}
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-primary shadow-xl border border-secondary rounded-lg">
          {children}
        </div>
      </div>
    </Dialog>
  );
}

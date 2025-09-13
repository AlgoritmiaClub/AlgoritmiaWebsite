'use client';

import { useEffect, useRef } from 'react';
import { SubmissionForm } from './SubmissionForm';

export function SubmissionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  // Close the dialog if the user clicks on the backdrop
  const handleClickOutside = (event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
    if (event.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog 
      ref={dialogRef} 
      onClose={onClose} 
      onClick={handleClickOutside} 
      className="p-8 rounded-lg shadow-xl backdrop:bg-black/40 max-w-2xl w-full"
    >
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold text-slate-800">Share Your Profile</h2>
        <button onClick={onClose} className="text-3xl leading-none font-bold text-slate-400 hover:text-slate-800">&times;</button>
      </div>
      <p className="mt-2 text-sm text-slate-600">Submit your profile to be featured on the Algoritmia talent directory.</p>
      <div className="mt-6">
        <SubmissionForm />
      </div>
    </dialog>
  );
}

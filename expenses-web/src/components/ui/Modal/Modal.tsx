// Modal.tsx
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    className?: string;
    overlayClassName?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    closeOnOverlayClick?: boolean;
}

export const Modal = ({
                          isOpen,
                          onClose,
                          title,
                          children,
                          className,
                          overlayClassName,
                          size = 'md',
                          closeOnOverlayClick = true
                      }: ModalProps) => {

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl'
    }[size];

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    useEffect(() => {
        const body = document.body;
        if (isOpen) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'unset';
        }
        return () => {
            body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return createPortal(
        <div
            className={clsx(
                "modal-overlay d-flex align-items-center justify-content-center p-3",
                overlayClassName
            )}
            onClick={closeOnOverlayClick ? onClose : undefined}
        >
            <div
                className={clsx(
                    "modal-content bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg",
                    sizeClasses,
                    "animate-slide-up", // Animação do sistema
                    className
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header d-flex justify-content-between align-items-center p-6 border-bottom border-zinc-700">
                    <h2 className="modal-title text-zinc-100 fw-bold m-0 fs-5">{title}</h2>
                    <button
                        type="button"
                        className="modal-close-btn bg-transparent border-0 text-zinc-400 fs-3 hover-bg-zinc-700 hover-text-zinc-100 rounded-circle d-flex align-items-center justify-content-center"
                        aria-label="Close"
                        onClick={onClose}
                        style={{ width: '32px', height: '32px' }}
                    >
                        ×
                    </button>
                </div>
                <div className="modal-body p-6 overflow-auto" style={{ maxHeight: '70vh' }}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};
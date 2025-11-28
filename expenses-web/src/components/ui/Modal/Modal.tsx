import React, {useEffect} from "react";
import {createPortal} from "react-dom";
import clsx from "clsx";
import './Modal.scss'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    className?: string;
}

export const Modal = ({ isOpen, onClose, title, children, className }: ModalProps) => {
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
         }, [onClose]
     )
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
    } )

    if (!isOpen) {
        return null;
        }

    return createPortal(
        <div className={"transaction-modal-overlay"} onClick={onClose}>
            <div
                className={clsx("transaction-modal-content", className)}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header d-flex justify-content-between align-items-center mb-4">
                    <h5 className="modal-title m-0">{title}</h5>
                    <button
                        type="button"
                        className="btn-close btn-close-modal"
                        aria-label="Close"
                        onClick={onClose}
                    />
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    )
}
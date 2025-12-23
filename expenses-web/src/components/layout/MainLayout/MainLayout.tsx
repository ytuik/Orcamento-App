// MainLayout.tsx
import { useState } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import { TransactionFormModal } from "../../transactions/TransactionFormModal/TransactionFormModal.tsx";

export const MainLayout = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className="d-flex min-vh-100 bg-zinc-950">
            <Sidebar onOpenNewTransaction={handleOpenModal} />

            <main className="flex-grow-1 ms-sidebar w-calc-sidebar p-0 pb-20 pb-md-0 transition-smooth">
                <Outlet />
            </main>

            {isModalOpen && (
                <TransactionFormModal isOpen={isModalOpen} onClose={handleCloseModal} />
            )}
        </div>
    );
};
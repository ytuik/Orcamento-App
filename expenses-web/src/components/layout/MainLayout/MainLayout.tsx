import { useState } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import {TransactionFormModal} from "../../transactions/TransactionFormModal/TransactionFormModal.tsx";
import './MainLayout.scss';

export const MainLayout = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className="app-layout">
            <Sidebar onOpenNewTransaction={handleOpenModal} />

            <main className="main-content">
                <Outlet />
            </main>

             {isModalOpen && (
                <TransactionFormModal isOpen={isModalOpen} onClose={handleCloseModal} />
            )}
        </div>
    );
};
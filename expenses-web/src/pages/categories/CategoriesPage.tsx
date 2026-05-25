import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import clsx from "clsx";

import { useCategoryData } from "@/hooks/useCategoryData.ts";
import { getIconByKey } from "@/utils/iconUtils.tsx";
import { CategoryFormModal } from "./CategoryFormModal/CategoryFormModal.tsx";
import type { CategoryDto } from "@/types/categoryDto";

const COLOR_HEX: Record<string, string> = {
    red:    '#f87171',
    blue:   '#60a5fa',
    green:  '#059669',
    yellow: '#fbbf24',
    orange: '#fd7e14',
    purple: '#8257e5',
    pink:   '#ec4899',
    gray:   '#71717a',
    dark:   '#18181b',
};

function CategoriesPage() {
    const { allCategories, incomeCategories, expenseCategories, deleteCategory } = useCategoryData();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState<CategoryDto | null>(null);
    const [activeTab, setActiveTab] = useState<'EXPENSE' | 'INCOME'>('EXPENSE');

    const handleOpenCreate = () => {
        setCategoryToEdit(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (category: CategoryDto) => {
        setCategoryToEdit(category);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCategoryToEdit(null);
    };

    const handleDelete = (id: number) => {
        deleteCategory.mutate(id);
    };

    const displayed = activeTab === 'EXPENSE' ? expenseCategories : incomeCategories;

    return (
        <div className="container min-vh-100 bg-zinc-950 text-zinc-100 p-6 p-lg-8">
            <div className="mb-5 d-flex flex-row justify-content-between align-items-center">
                <div>
                    <h1 className="fw-bold text-zinc-100 mb-2">Categorias</h1>
                    <p className="text-zinc-500 fs-6">Gerencie os rótulos das suas transações</p>
                </div>
                <button
                    onClick={handleOpenCreate}
                    className="btn btn-primary rounded-md px-3 py-2 fs-5 fw-semibold d-flex align-items-center gap-2"
                >
                    <Plus />
                    Nova Categoria
                </button>
            </div>

            {/* Tabs */}
            <div className="d-flex gap-2 mb-4">
                <button
                    onClick={() => setActiveTab('EXPENSE')}
                    className={clsx('btn fw-semibold', activeTab === 'EXPENSE' ? 'btn-danger' : 'btn-outline-secondary')}
                >
                    Despesas ({expenseCategories.length})
                </button>
                <button
                    onClick={() => setActiveTab('INCOME')}
                    className={clsx('btn fw-semibold', activeTab === 'INCOME' ? 'btn-success' : 'btn-outline-secondary')}
                >
                    Receitas ({incomeCategories.length})
                </button>
            </div>

            {/* Lista */}
            <div className="d-flex flex-column gap-3">
                {displayed.length === 0 ? (
                    <div className="text-white-50 p-4 border border-dashed rounded-lg text-center">
                        Nenhuma categoria de {activeTab === 'EXPENSE' ? 'despesa' : 'receita'} cadastrada.
                    </div>
                ) : (
                    displayed.map((cat) => (
                        <div
                            key={cat.id}
                            className="d-flex align-items-center justify-content-between bg-zinc-900 rounded-3 px-4 py-3"
                            style={{ borderLeft: `4px solid ${COLOR_HEX[cat.color] ?? '#71717a'}` }}
                        >
                            <div className="d-flex align-items-center gap-3">
                                <div
                                    className="d-flex align-items-center justify-content-center rounded-3"
                                    style={{
                                        width: 40,
                                        height: 40,
                                        backgroundColor: `${COLOR_HEX[cat.color] ?? '#71717a'}22`,
                                        color: COLOR_HEX[cat.color] ?? '#71717a',
                                    }}
                                >
                                    {getIconByKey(cat.iconKey)}
                                </div>
                                <div>
                                    <p className="text-zinc-100 fw-semibold mb-0">{cat.name}</p>
                                    {cat.budgetLimit && (
                                        <span className="text-zinc-500 fs-8">
                                            Limite: {cat.budgetLimit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="d-flex gap-2">
                                <button
                                    onClick={() => handleOpenEdit(cat)}
                                    className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
                                >
                                    <Pencil size={14} />
                                    Editar
                                </button>
                                {!cat.isSystem && (
                                    <button
                                        onClick={() => handleDelete(cat.id)}
                                        disabled={deleteCategory.isPending}
                                        className="btn btn-sm btn-outline-danger"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <CategoryFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                categoryToEdit={categoryToEdit}
            />
        </div>
    );
}

export default CategoriesPage;

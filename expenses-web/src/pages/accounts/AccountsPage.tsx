import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useAccounts } from "@/hooks/useAccounts.ts";
import { useAccountMutations } from "@/hooks/useAccountMutations.ts";
import { AccountCard } from "@/components/accounts/AccountCard/AccountCard.tsx";
import { AccountFormModal } from "@/pages/accounts/AccountFormModal/AccountFormModal.tsx";
import type { AccountDto } from "@/types/accountDto";

function AccountsPage() {
    const { allAccounts } = useAccounts();
    const { remove } = useAccountMutations();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [accountToEdit, setAccountToEdit] = useState<AccountDto | null>(null);

    const handleOpenCreate = () => {
        setAccountToEdit(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (account: AccountDto) => {
        setAccountToEdit(account);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setAccountToEdit(null);
    };

    const handleDelete = (id: number) => {
        remove.mutate(id);
    };

    return (
        <div className="accounts-container container min-vh-100 bg-zinc-950 text-zinc-100 p-6 p-lg-8">
            <div className="header-section mb-5 d-flex flex-row justify-content-between align-items-center">
                <div>
                    <h1 className="fw-bold text-zinc-100 mb-2">Minhas Contas</h1>
                    <p className="text-zinc-500 fs-6">Gerenciando minhas carteiras e bancos</p>
                </div>
                <div>
                    <button
                        onClick={handleOpenCreate}
                        className="btn btn-primary rounded-md px-3 py-2 fs-5 fw-semibold d-flex align-items-center gap-2"
                    >
                        <Plus />
                        Adicionar Conta
                    </button>
                </div>
            </div>

            <div className="accounts-list container">
                <div className="row row-gap-4">
                    {allAccounts.length > 0 ? (
                        allAccounts.map(acc => (
                            <div key={acc.id} className="col-xl">
                                <AccountCard
                                    name={acc.name}
                                    color={acc.color}
                                    balance={acc.currentBalance}
                                    className="w-100"
                                >
                                    <div className="mt-2 border-f-t border-zinc-700 d-flex flex-row gap-2 pt-4 justify-content-around">
                                        <button
                                            onClick={() => handleOpenEdit(acc)}
                                            className="align-items-center justify-content-center btn btn-sm btn-outline-purple d-flex flex-row gap-2 w-75 fw-semibold fs-5"
                                        >
                                            <Pencil />
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(acc.id)}
                                            disabled={remove.isPending}
                                            className="btn btn-outline-danger"
                                        >
                                            <Trash2 />
                                        </button>
                                    </div>
                                </AccountCard>
                            </div>
                        ))
                    ) : (
                        <div className="text-white-50 p-3 border border-dashed rounded-lg">
                            Nenhuma conta cadastrada.
                        </div>
                    )}
                </div>
            </div>

            <AccountFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                accountToEdit={accountToEdit}
            />
        </div>
    );
}

export default AccountsPage;

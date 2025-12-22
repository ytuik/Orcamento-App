import {Modal} from "../../ui/Modal/Modal.tsx";
import {AlertTriangle} from "lucide-react";

interface ConfirmDeleteTransactionModal{
    isOpen: boolean,
    onClose: () => void,
    onConfirm: () => void,
    isLoading: boolean
}

export const ConfirmDeleteTransactionModal = ({
    isOpen,
    onClose,
    onConfirm,
    isLoading
}: ConfirmDeleteTransactionModal) => {
    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Confirmar exclusão"
            className="confirm-delete-transaction-modal"
        >
            <div>
                <div className={'d-flex justify-content-center gap-3'}>
                    <div className="text-danger">
                        <AlertTriangle size={24}/>
                    </div>
                    <div>
                        <h3 className="text-bg-dark">Excluir Transação?</h3>
                        <p className="text-sm text-zinc-400">Essa ação não pode ser desfeita.</p>
                    </div>
                </div>

                <div className={"d-flex justify-content-end gap-3 mt-4"}>
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="btn btn-primary py-2 fw-bold"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="btn btn-danger py-2 fw-bold"
                    >
                        {isLoading ? 'Excluindo...' : 'Sim, excluir'}
                    </button>
                </div>
            </div>


        </Modal>
    )
}
import clsx from "clsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type TransactionFormData, transactionFormSchema} from "../../lib/validators/transactionSchema.ts";
import {TransactionType} from "../../types/transactionDto/transactionType.ts";
import {TransactionCategory} from "../../types/transactionDto/transactionCategory.ts";
import {accountService} from "../../services/accountService.ts";
import {transactionService} from "../../services/transactionService.ts";
import {Modal} from "../ui/Modal/Modal.tsx";
import './NewTransactionModal.scss';

interface NewTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const NewTransactionModal = ({ isOpen, onClose }: NewTransactionModalProps) => {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<TransactionFormData>({
        resolver: zodResolver(transactionFormSchema),
        defaultValues: {
            type: TransactionType.EXPENSE,
            transactionDate: new Date().toISOString().split('T')[0],
        }
    });

    const selectedType = useWatch({control, name: 'type'});
    const { data: accounts } = useQuery({
        queryKey: ['accounts'],
        queryFn: () => accountService.getAllAccounts()
    });

    const createTransactionMutation = useMutation({
        mutationFn: async (data: TransactionFormData) => {
            return await transactionService.createTransaction(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
            reset();
            onClose();
        },
        onError: (error) => {
            console.error('Erro ao criar transação:', error);
            alert('Erro ao criar transação. Por favor, tente novamente.')
        }
    });

    const onSubmit = (data: TransactionFormData) => {
        createTransactionMutation.mutate(data);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={'Nova Transação'}>
            <form onSubmit={handleSubmit(onSubmit)} className={'form-transaction'}>
                <div className={'d-flex gap-3 mb-4'}>
                    <button type={'button'} className={clsx('btn-type income',
                        {active: selectedType === TransactionType.INCOME})}
                            onClick={() => setValue('type', TransactionType.INCOME)}
                    >
                        {TransactionType.INCOME}
                    </button>
                    <button type={'button'} className={clsx('btn-type expense',
                        {active: selectedType === TransactionType.EXPENSE})}
                            onClick={() => setValue('type', TransactionType.EXPENSE)}
                    >
                        {TransactionType.EXPENSE}
                    </button>
                </div>
                <div className="form-group mb-3">
                    <label>Descrição</label>
                    <input
                        {...register('description')}
                        className={clsx("form-control", { "is-invalid": errors.description })}
                        placeholder="Ex: Aluguel, Salário, Mercado"
                    />
                    {errors.description && <span className="text-error">{errors.description.message}</span>}
                </div>

                <div className="form-group mb-3">
                    <label>Valor</label>
                    <input
                        type="number"
                        step="0.01"

                        {...register('amount', { valueAsNumber: true })}
                        className={clsx("form-control", { "is-invalid": errors.amount })}
                        placeholder="0,00"
                    />
                    {errors.amount && <span className="text-error">{errors.amount.message}</span>}
                </div>

                <div className="row">
                    <div className="col-6 mb-3">
                        <label>Categoria</label>
                        <select
                            {...register('category')}
                            className={clsx("form-control", { "is-invalid": errors.category })}
                        >
                            <option value="">Selecione</option>
                            {Object.entries(TransactionCategory).map(([key, value]) => (
                                <option key={value} value={value}>{key}</option>
                            ))}
                        </select>
                        {errors.category && <span className="text-error">{errors.category.message}</span>}
                    </div>

                    <div className="col-6 mb-3">
                        <label>Conta</label>
                        <select
                            {...register('accountId', { valueAsNumber: true })}
                            className={clsx("form-control", { "is-invalid": errors.accountId })}
                        >
                            <option value="">Selecione</option>
                            {accounts?.map(acc => (
                                <option key={acc.id} value={acc.id}>{acc.name}</option>
                            ))}
                        </select>
                        {errors.accountId && <span className="text-error">{errors.accountId.message}</span>}
                    </div>
                </div>

                <div className="form-group mb-4">
                    <label>Data</label>
                    <input
                        type="date"
                        {...register('transactionDate')}
                        className="form-control"
                    />
                    {errors.transactionDate && <span className="text-error">{errors.transactionDate.message}</span>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-100 py-2 fw-bold"
                    style={{ backgroundColor: selectedType === TransactionType.EXPENSE ? '#f87171' : '#059669', border: 'none' }}
                >
                    {isSubmitting ? 'Salvando...' : 'Cadastrar'}
                </button>
            </form>
        </Modal>
    )
}
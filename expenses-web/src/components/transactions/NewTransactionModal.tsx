import { useEffect } from "react";
import clsx from "clsx";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Separei os imports para evitar erros de parser em versões antigas
import type { TransactionFormData } from "../../lib/validators/transactionSchema";
import { transactionFormSchema } from "../../lib/validators/transactionSchema";

import { TransactionType } from "../../types/transactionDto/transactionType";
import { TransactionCategory } from "../../types/transactionDto/transactionCategory";
import { Modal } from "../ui/Modal/Modal";
import { useAccounts } from "../../hooks/useAccounts";
import { useCreateTransaction } from "../../hooks/useCreateTransactions";

import './NewTransactionModal.scss';

interface NewTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const NewTransactionModal = ({ isOpen, onClose }: NewTransactionModalProps) => {

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

    const selectedType = useWatch({ control, name: 'type' });

    const { data: accounts, isLoading } = useAccounts();

    const { mutate: createTransaction, isPending } = useCreateTransaction(() => {
        reset();
        onClose();
    });

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    const onSubmit = (data: TransactionFormData) => {
        createTransaction(data);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Nova Transação">
            <form onSubmit={handleSubmit(onSubmit)} className="form-transaction">

                <div className="d-flex gap-3 mb-4">
                    <button
                        type="button"
                        className={clsx('btn-type income', { active: selectedType === TransactionType.INCOME })}
                        onClick={() => setValue('type', TransactionType.INCOME)}
                    >
                        Receita
                    </button>
                    <button
                        type="button"
                        className={clsx('btn-type expense', { active: selectedType === TransactionType.EXPENSE })}
                        onClick={() => setValue('type', TransactionType.EXPENSE)}
                    >
                        Despesa
                    </button>
                </div>

                {/* Descrição */}
                <div className="form-group mb-3">
                    <label htmlFor="description">Descrição</label>
                    <input
                        id="description"
                        {...register('description')}
                        className={clsx("form-control", { "is-invalid": errors.description })}
                        placeholder="Ex: Aluguel, Salário"
                    />
                    {errors.description && <span className="invalid-feedback">{errors.description.message}</span>}
                </div>

                {/* Valor */}
                <div className="form-group mb-3">
                    <label htmlFor="amount">Valor</label>
                    <input
                        id="amount"
                        type="number"
                        step="0.01"
                        {...register('amount', { valueAsNumber: true })}
                        className={clsx("form-control", { "is-invalid": errors.amount })}
                        placeholder="0,00"
                    />
                    {errors.amount && <span className="invalid-feedback">{errors.amount.message}</span>}
                </div>

                <div className="row">
                    {/* Categoria */}
                    <div className="col-6 mb-3">
                        <label htmlFor="category">Categoria</label>
                        <select
                            id="category"
                            {...register('category')}
                            className={clsx("form-control", { "is-invalid": errors.category })}
                        >
                            <option value="">Selecione</option>
                            {Object.values(TransactionCategory).map(value => (
                                <option key={value} value={value}>{value}</option>
                            ))}
                        </select>
                        {errors.category && <span className="invalid-feedback">{errors.category.message}</span>}
                    </div>

                    {/* Conta */}
                    <div className="col-6 mb-3">
                        <label htmlFor="accountId">Conta</label>
                        <select
                            id="accountId"
                            {...register('accountId', { valueAsNumber: true })}
                            className={clsx("form-control", { "is-invalid": errors.accountId })}
                            disabled={isLoading}
                        >
                            <option value="">Selecione</option>
                            {accounts?.map(acc => (
                                <option key={acc.id} value={acc.id}>{acc.name}</option>
                            ))}
                        </select>
                        {errors.accountId && <span className="invalid-feedback">{errors.accountId.message}</span>}
                    </div>
                </div>

                {/* Data */}
                <div className="form-group mb-4">
                    <label htmlFor="date">Data</label>
                    <input
                        id="date"
                        type="date"
                        {...register('transactionDate')}
                        className={clsx("form-control", { "is-invalid": errors.transactionDate })}
                    />
                    {errors.transactionDate && <span className="invalid-feedback">{errors.transactionDate.message}</span>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || isPending}
                    className={clsx("btn w-100 py-2 fw-bold btn-submit", {
                        'btn-submit--income': selectedType === TransactionType.INCOME,
                        'btn-submit--expense': selectedType === TransactionType.EXPENSE
                    })}
                >
                    {isPending ? 'Salvando...' : 'Cadastrar'}
                </button>
            </form>
        </Modal>
    );
};
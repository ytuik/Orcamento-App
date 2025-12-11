import { useEffect } from "react";
import clsx from "clsx";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { TransactionFormData } from "../../lib/validators/transactionSchema";
import { transactionFormSchema } from "../../lib/validators/transactionSchema";

import { TransactionType } from "../../types/transactionDto/transactionType";
import { Modal } from "../ui/Modal/Modal";
import { useAccounts } from "../../hooks/useAccounts";
import { useCreateTransaction } from "../../hooks/useCreateTransactions";

import './NewTransactionModal.scss';
import {useCategoryData} from "../../hooks/useCategoryData.ts";

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

    const { data: accounts } = useAccounts();

    const { expenseCategories, incomeCategories} = useCategoryData()

    const { mutate: createTransaction } = useCreateTransaction(() => {
        reset();
        onClose();
    });

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    const onSubmit = (data: TransactionFormData) => {
        console.log('Submitting transaction:', data)
        createTransaction(data);
    };

    const onError = (errors: any) => {
        console.log("Erros de validação impedindo o submit:", errors);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={'Nova Transação'}>
            <form onSubmit={handleSubmit(onSubmit, onError)} className={'form-transaction'}>
                <div className={'d-flex gap-3 mb-4'}>
                    <button type={'button'} className={clsx('btn-type income',
                        {active: selectedType === TransactionType.INCOME})}
                            onClick={() => setValue('type', TransactionType.INCOME)}
                    >
                        Receita
                    </button>
                    <button type={'button'} className={clsx('btn-type expense',
                        {active: selectedType === TransactionType.EXPENSE})}
                            onClick={() => setValue('type', TransactionType.EXPENSE)}
                    >
                        Despesa
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
                            {...register('categoryId', { valueAsNumber: true })}
                            className={clsx("form-control", { "is-invalid": errors.categoryId })}
                        >

                            <option value={99}>Selecione</option>
                            {selectedType === TransactionType.EXPENSE && expenseCategories &&
                                expenseCategories.map(it =>
                                    <option key={it.id} value={it.id}>{it.name}</option>
                                )
                            }
                            {selectedType === TransactionType.INCOME && incomeCategories &&
                                incomeCategories.map(it =>
                                    <option key={it.id} value={it.id}>{it.name}</option>
                                )
                            }
                        </select>
                        {errors.categoryId && <span className="text-error">{errors.categoryId.message}</span>}
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
                    className={clsx("btn btn-primary w-100 py-2 fw-bold",
                        { 'btn-btn-submit--expense': selectedType === TransactionType.EXPENSE},
                        { 'btn-btn-submit--income': selectedType === TransactionType.INCOME}
                    )}
                    style={{ backgroundColor: selectedType === TransactionType.EXPENSE ? '#f87171' : '#059669', border: 'none' }}
                >
                    {isSubmitting ? 'Salvando...' : 'Cadastrar'}
                </button>
            </form>
        </Modal>
    )
}
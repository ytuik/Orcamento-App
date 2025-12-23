import { useEffect } from "react";
import clsx from "clsx";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { TransactionFormData } from "../../../lib/validators/transactionSchema.ts";
import { transactionFormSchema } from "../../../lib/validators/transactionSchema.ts";

import { TransactionType } from "../../../types/transactionDto/transactionType.ts";
import { Modal } from "../../ui/Modal/Modal.tsx";
import { useAccounts } from "../../../hooks/useAccounts.ts";
import { useTransactionMutations } from "../../../hooks/useTransactionMutations.ts";

import {useCategoryData} from "../../../hooks/useCategoryData.ts";
import type {TransactionDto} from "../../../types/transactionDto";
import {format, parseISO} from "date-fns";

interface NewTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    transactionToEdit?: TransactionDto | null;
}

export const TransactionFormModal = ({ isOpen, onClose , transactionToEdit}: NewTransactionModalProps) => {

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

    const { allAccounts: accounts } = useAccounts();

    const { expenseCategories, incomeCategories} = useCategoryData()

    const {
        create: createTransaction,
        update: updateTransaction
    } = useTransactionMutations();

    const isEditing = !!transactionToEdit

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    const onSubmit = (data: TransactionFormData) => {
        if(isEditing && transactionToEdit?.id) {
            updateTransaction.mutate({ id: transactionToEdit!.id, data }, {
                onSuccess: () => {
                    onClose()
                }
            });
        } else {
        createTransaction.mutate(data, {
            onSuccess: () => {
               onClose()
            }
        });

        }
    };

    const onError = (errors: any) => {
        console.log("Erros de validação impedindo o submit:", errors);
    };

    useEffect(() => {
        if(isOpen) {
            if (isEditing && transactionToEdit) {
                const dateString = format(parseISO(transactionToEdit.transactionDate), 'yyyy-MM-dd');
                reset(
                    {
                        accountId: transactionToEdit.accountId,
                        amount: transactionToEdit.amount,
                        type: transactionToEdit.type as TransactionType,
                        categoryId: transactionToEdit.categoryId,
                        transactionDate: dateString,
                        description: transactionToEdit.description,
                        comment: transactionToEdit.comment || '',
                    }
                )
            } else {
                reset({
                    type: TransactionType.EXPENSE,
                    transactionDate: new Date().toISOString().split('T')[0],
                    description: '',
                    amount: undefined,
                    categoryId: undefined,
                    accountId: undefined
                });
            }
        }
    }, [isEditing ,isOpen, transactionToEdit, reset]);

    return (
        <Modal
            size="lg"
            isOpen={isOpen}
            onClose={onClose}
            title={isEditing? 'Editar Transacao' :'Nova Transação'}>
            <form onSubmit={handleSubmit(onSubmit, onError)} className={'form-transaction'}>
                <div className={'d-flex gap-3 mb-4'}>
                    <button
                        type={'button'}
                        className={clsx(
                            'btn-type-base d-flex align-items-md-center justify-content-center',
                            {'btn-active-success': selectedType === TransactionType.INCOME},
                        )}
                        onClick={() => setValue('type', TransactionType.INCOME)}
                    >
                        Receita
                    </button>
                    <button type={'button'} className={clsx('btn-type-base d-flex align-items-md-center justify-content-center',
                        {'btn-active-danger': selectedType === TransactionType.EXPENSE})}
                            onClick={() => setValue('type', TransactionType.EXPENSE)}
                    >
                        Despesa
                    </button>
                </div>
                <div className="form-group mb-3">
                    <label className="text-zinc-400 mb-1 text-sm">Descrição</label>
                    <input
                        {...register('description')}
                        className={clsx("form-control", {"is-invalid": errors.description})}
                        placeholder="Ex: Aluguel, Salário, Mercado"
                    />
                    {errors.description && (
                        <span className="text-red text-xs mt-1 d-block">{errors.description.message}</span>
                    )}
                </div>

                <div className="form-group mb-3">
                    <label className="text-zinc-400 mb-1 text-sm">Valor</label>
                    <input
                        type="number"
                        step="0.01"

                        {...register('amount', {valueAsNumber: true})}
                        className={clsx("form-control", {"is-invalid": errors.amount})}
                        placeholder="0,00"
                    />
                    {errors.amount && <span className="text-error">{errors.amount.message}</span>}
                </div>

                <div className="row">
                    <div className="col-6 mb-3">
                        <label className="text-zinc-400 mb-1 text-sm">Categoria</label>
                        <select
                            {...register('categoryId', {valueAsNumber: true})}
                            className={clsx("form-control", {"is-invalid": errors.categoryId})}
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
                        <label className="text-zinc-400 mb-1 text-sm">Conta</label>
                        <select
                            {...register('accountId', {valueAsNumber: true})}
                            className={clsx("form-control", {"is-invalid": errors.accountId})}
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
                    <label className="text-zinc-400 mb-1 text-sm">Data</label>
                    <input
                        type="date"
                        {...register('transactionDate')}
                        className="form-control"
                    />
                    {errors.transactionDate && <span className="text-error">{errors.transactionDate.message}</span>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || createTransaction.isPending || updateTransaction.isPending}
                    className={clsx(
                        "btn w-100 py-2 fw-bold",
                        selectedType === TransactionType.EXPENSE
                            ? 'btn-submit-danger'
                            : 'btn-submit-success'
                    )}
                >
                    {createTransaction.isPending || updateTransaction.isPending ? 'Salvando...'
                        : (isEditing ? 'Salvar Alterações' : 'Cadastrar')}
                </button>
            </form>
        </Modal>
    )
}
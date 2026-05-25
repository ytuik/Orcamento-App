import { useEffect } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import type { CategoryDto } from "@/types/categoryDto";
import { TransactionType } from "@/types/transactionDto/transactionType.ts";
import { AvailableColorsType } from "@/types/common/AvailableColorsType.ts";
import { useCategoryData } from "@/hooks/useCategoryData.ts";
import { Modal } from "@/components/ui/Modal/Modal.tsx";
import { getIconByKey, ICON_LIBRARY } from "@/utils/iconUtils.tsx";

const categoryFormSchema = z.object({
    name: z.string().min(2, 'Mínimo 2 caracteres').max(40, 'Máximo 40 caracteres'),
    iconKey: z.string().min(1, 'Selecione um ícone'),
    color: z.string().min(1, 'Selecione uma cor'),
    type: z.enum([TransactionType.INCOME, TransactionType.EXPENSE]),
    budgetLimit: z.number().min(0).nullable().optional(),
});

type CategoryFormData = z.infer<typeof categoryFormSchema>;

interface CategoryFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    categoryToEdit?: CategoryDto | null;
}

const COLORS = Object.values(AvailableColorsType);

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

const ICON_KEYS = [...new Set(Object.keys(ICON_LIBRARY))];

export const CategoryFormModal = ({ isOpen, onClose, categoryToEdit }: CategoryFormModalProps) => {
    const isEditing = !!categoryToEdit;
    const { createCategory, updateCategory } = useCategoryData();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: { name: '', iconKey: 'HOME', color: 'blue', type: TransactionType.EXPENSE, budgetLimit: null }
    });

    const selectedColor = watch('color');
    const selectedIcon = watch('iconKey');
    const selectedType = watch('type');

    useEffect(() => {
        if (!isOpen) return;
        if (isEditing && categoryToEdit) {
            reset({
                name: categoryToEdit.name,
                iconKey: categoryToEdit.iconKey.toUpperCase(),
                color: categoryToEdit.color,
                type: categoryToEdit.type,
                budgetLimit: categoryToEdit.budgetLimit ?? null,
            });
        } else {
            reset({ name: '', iconKey: 'HOME', color: 'blue', type: TransactionType.EXPENSE, budgetLimit: null });
        }
    }, [isOpen, isEditing, categoryToEdit, reset]);

    const onSubmit = (data: CategoryFormData) => {
        const payload = {
            name: data.name,
            iconKey: data.iconKey,
            color: data.color,
            type: data.type,
            budgetLimit: data.budgetLimit ?? undefined,
        };

        if (isEditing && categoryToEdit) {
            updateCategory.mutate(
                { id: categoryToEdit.id, data: { ...categoryToEdit, ...payload } },
                { onSuccess: () => onClose() }
            );
        } else {
            createCategory.mutate(payload, { onSuccess: () => onClose() });
        }
    };

    const isPending = createCategory.isPending || updateCategory.isPending;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Editar Categoria' : 'Nova Categoria'} size="lg">
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3 pt-2">

                {/* Nome + Tipo */}
                <div className="row g-3">
                    <div className="col-8">
                        <label className="text-zinc-300 fw-bold mb-1 text-sm d-block">Nome</label>
                        <input
                            {...register('name')}
                            className={clsx("form-control", { "is-invalid": errors.name })}
                            placeholder="Ex: Alimentação, Salário"
                            autoFocus
                        />
                        {errors.name && <span className="text-error">{errors.name.message}</span>}
                    </div>
                    <div className="col-4">
                        <label className="text-zinc-300 fw-bold mb-1 text-sm d-block">Tipo</label>
                        <div className="d-flex gap-2 h-100 align-items-start pt-1">
                            <button
                                type="button"
                                onClick={() => setValue('type', TransactionType.EXPENSE)}
                                className={clsx('btn btn-sm fw-semibold flex-grow-1', selectedType === TransactionType.EXPENSE ? 'btn-danger' : 'btn-outline-secondary')}
                            >
                                Despesa
                            </button>
                            <button
                                type="button"
                                onClick={() => setValue('type', TransactionType.INCOME)}
                                className={clsx('btn btn-sm fw-semibold flex-grow-1', selectedType === TransactionType.INCOME ? 'btn-success' : 'btn-outline-secondary')}
                            >
                                Receita
                            </button>
                        </div>
                    </div>
                </div>

                {/* Cor */}
                <div className="form-group">
                    <label className="text-zinc-300 fw-bold mb-1 text-sm d-block">Cor</label>
                    <div className="d-flex flex-wrap gap-2 mt-1">
                        {COLORS.map((color) => (
                            <button
                                key={color}
                                type="button"
                                title={color}
                                onClick={() => setValue('color', color)}
                                style={{
                                    width: 26,
                                    height: 26,
                                    borderRadius: '50%',
                                    border: 'none',
                                    cursor: 'pointer',
                                    backgroundColor: COLOR_HEX[color] ?? '#71717a',
                                    outline: selectedColor === color ? '3px solid white' : '3px solid transparent',
                                    outlineOffset: 2,
                                    transition: 'outline 0.15s ease',
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Ícone */}
                <div className="form-group">
                    <label className="text-zinc-300 fw-bold mb-1 text-sm d-block">Ícone</label>
                    <div className="d-flex flex-wrap gap-2 mt-1" style={{ maxHeight: 120, overflowY: 'auto' }}>
                        {ICON_KEYS.map((key) => (
                            <button
                                key={key}
                                type="button"
                                title={key}
                                onClick={() => setValue('iconKey', key)}
                                className={clsx(
                                    "btn btn-sm d-flex align-items-center justify-content-center",
                                    selectedIcon === key ? 'btn-primary' : 'btn-outline-secondary'
                                )}
                                style={{ width: 36, height: 36, padding: 0 }}
                            >
                                {getIconByKey(key)}
                            </button>
                        ))}
                    </div>
                    {errors.iconKey && <span className="text-error">{errors.iconKey.message}</span>}
                </div>

                {/* Limite de orçamento */}
                <div className="form-group">
                    <label className="text-zinc-300 fw-bold mb-1 text-sm d-block">
                        Limite de Gastos <span className="text-zinc-500 fw-normal">(opcional)</span>
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        {...register('budgetLimit', { setValueAs: (v) => (v === '' || v === null ? null : Number(v)) })}
                        className="form-control"
                        placeholder="Ex: 500,00"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || isPending}
                    className="btn btn-primary w-100 py-2 fw-bold mt-1"
                >
                    {isPending ? 'Salvando...' : isEditing ? 'Salvar Alterações' : 'Criar Categoria'}
                </button>
            </form>
        </Modal>
    );
};

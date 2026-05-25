import { useEffect } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { AccountDto } from "@/types/accountDto";
import { type AccountFormData, accountFormSchema } from "@/lib/validators/accountSchema.ts";
import { useAccountMutations } from "@/hooks/useAccountMutations.ts";
import { Modal } from "@/components/ui/Modal/Modal.tsx";
import { AvailableColorsType } from "@/types/common/AvailableColorsType.ts";

interface AccountFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    accountToEdit?: AccountDto | null;
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

export const AccountFormModal = ({ isOpen, onClose, accountToEdit }: AccountFormModalProps) => {
    const isEditing = !!accountToEdit;

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<AccountFormData>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: { name: '', balance: 0, color: 'blue' }
    });

    const selectedColor = watch('color');
    const { create, update } = useAccountMutations();

    useEffect(() => {
        if (!isOpen) return;
        if (isEditing && accountToEdit) {
            reset({ name: accountToEdit.name, balance: accountToEdit.currentBalance, color: accountToEdit.color });
        } else {
            reset({ name: '', balance: 0, color: 'blue' });
        }
    }, [isOpen, isEditing, accountToEdit, reset]);

    const onSubmit = (data: AccountFormData) => {
        if (isEditing && accountToEdit) {
            update.mutate(
                { id: accountToEdit.id, data: { ...accountToEdit, name: data.name, color: data.color } },
                { onSuccess: () => onClose() }
            );
        } else {
            create.mutate(
                { name: data.name, balance: data.balance, color: data.color },
                { onSuccess: () => onClose() }
            );
        }
    };

    const isPending = create.isPending || update.isPending;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Editar Conta' : 'Nova Conta'}>
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3 pt-2">

                <div className="form-group">
                    <label className="text-zinc-300 fw-bold mb-1 text-sm d-block">Nome da Conta</label>
                    <input
                        {...register('name')}
                        className={clsx("form-control", { "is-invalid": errors.name })}
                        placeholder="Ex: Nubank, Carteira, Itaú"
                        autoFocus
                    />
                    {errors.name && <span className="text-error">{errors.name.message}</span>}
                </div>

                {!isEditing && (
                    <div className="form-group">
                        <label className="text-zinc-300 fw-bold mb-1 text-sm d-block">Saldo Inicial</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            {...register('balance', { valueAsNumber: true })}
                            className={clsx("form-control", { "is-invalid": errors.balance })}
                            placeholder="0,00"
                        />
                        {errors.balance && <span className="text-error">{errors.balance.message}</span>}
                    </div>
                )}

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
                                    width: 28,
                                    height: 28,
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

                <div
                    className="rounded-3 p-3 d-flex align-items-center gap-3 mt-1"
                    style={{ backgroundColor: '#27272a', border: `2px solid ${COLOR_HEX[selectedColor] ?? '#71717a'}` }}
                >
                    <div
                        className="rounded-3 flex-shrink-0"
                        style={{ width: 16, height: 48, backgroundColor: COLOR_HEX[selectedColor] ?? '#71717a' }}
                    />
                    <div>
                        <p className="text-zinc-200 fw-semibold mb-0" style={{ fontSize: '0.9rem' }}>
                            {watch('name') || 'Nome da conta'}
                        </p>
                        <span className="text-zinc-500" style={{ fontSize: '0.75rem' }}>Prévia do cartão</span>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || isPending}
                    className="btn btn-primary w-100 py-2 fw-bold mt-1"
                >
                    {isPending ? 'Salvando...' : isEditing ? 'Salvar Alterações' : 'Criar Conta'}
                </button>
            </form>
        </Modal>
    );
};

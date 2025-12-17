import { z } from 'zod';
import {TransactionType} from "../../types/transactionDto/transactionType";


export const transactionFormSchema = z.object({
    accountId: z.number().int().positive(),
    amount: z.number().min(
        0.01,
        'O Valor deve ser no mínimo R$ 0,01'
    ).nonnegative('O Valor não pode ser negativo'),
    type: z.enum(TransactionType),
    categoryId: z.number().int().positive(),
    transactionDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Data inválida'),
    description: z.string()
        .min(3, 'A Descrição deve ter no mínimo 3 caracteres')
        .max(100, 'A Descrição deve ter no máximo 100 caracteres'),
    comment: z.string().optional(),
    }
)
export type TransactionFormData = z.infer<typeof transactionFormSchema>;
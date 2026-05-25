import { z } from 'zod';

export const accountFormSchema = z.object({
        name: z.string()
            .min(3, 'O Nome deve ter no mínimo 3 caracteres')
            .max(50, 'O Nome deve ter no máximo 50 caracteres'),
        balance: z.number().min(
            0,
            'O Saldo inicial não pode ser negativo'
        ),
        color: z.string()
    }
)

export type AccountFormData = z.infer<typeof accountFormSchema>;
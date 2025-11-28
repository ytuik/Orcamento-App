const BRL_FORMATTER = new Intl.NumberFormat(
    'pt-BR',
    {
        style: 'currency',
        currency: 'BRL',
        }
);

export const formatCurrency = (amount: number | null | undefined) : string => {
    if (amount === null || amount === undefined || isNaN(amount)) {
        return BRL_FORMATTER.format(0);
    }
    return BRL_FORMATTER.format(amount);
};


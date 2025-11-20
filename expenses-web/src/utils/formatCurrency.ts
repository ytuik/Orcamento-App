const formatCurrency = (amount:number) => {
    if(isNaN(amount) || amount === null){
        return '0.00'
    }
    return new Intl.NumberFormat(
        'pt-BR',
        {
            style: 'currency',
            currency: 'BRL',
        }).format(amount);
};

export {formatCurrency};
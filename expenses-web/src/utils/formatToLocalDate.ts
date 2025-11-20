const formatToLocalDate = (date: Date) => {
    return date.toISOString().split("T")[0];
}

export {formatToLocalDate};
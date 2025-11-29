// @ts-ignore
export enum TransactionCategory {
    SHOPPING = "SHOPPING",
    FOOD = "FOOD",
    TRANSPORT = "TRANSPORT",
    UTILITIES = "UTILITIES",
    SALARY = "SALARY",
    ENTERTAINMENT = "ENTERTAINMENT",
    HEALTHCARE = "HEALTHCARE",
    EDUCATION = "EDUCATION",
    INVESTMENT = "INVESTMENT",
    OTHER = "OTHER"
}

export type TransactionCategoryType = `${TransactionCategory}`;
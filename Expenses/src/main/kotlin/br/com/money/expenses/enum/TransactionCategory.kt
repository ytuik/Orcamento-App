package br.com.money.expenses.enum

enum class TransactionCategory (val id : Int) {
    FOOD(1),
    TRANSPORT(2),
    ENTERTAINMENT(3),
    UTILITIES(4),
    HEALTHCARE(5),
    EDUCATION(6),
    SHOPPING(7),
    SALARY(8),
    INVESTMENT(9),
    OTHER(10);

    companion object {
        fun fromId(id: Int): TransactionCategory {
            return entries.find { it.id == id } ?:
                throw IllegalArgumentException("Invalid TransactionCategory id: $id")
        }
    }
}
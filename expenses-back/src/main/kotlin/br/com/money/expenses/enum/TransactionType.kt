package br.com.money.expenses.enum

enum class TransactionType(val id: Int) {
    INCOME(1),
    EXPENSE(2);

    companion object {
        fun fromId(id: Int): TransactionType {
            return entries.find { it.id == id } ?:
                throw IllegalArgumentException("Invalid TransactionType id: $id")
        }
    }
}
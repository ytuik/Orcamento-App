package br.com.money.expenses.enum

enum class CreditCardInstallmentStatus (val id: Int) {
    OPEN(1),
    PAID(2);

    companion object {
        fun fromId(id: Int) = entries.first { it.id == id}
    }
}
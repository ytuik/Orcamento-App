package br.com.money.expenses.model.dto.creditCard

data class CreateCreditCardRequestDTO (
    val name: String,
    val color: String,
    val iconKey: String,
    val limit: Double,
    val closingDay: Int,
    val dueDate: Int
)
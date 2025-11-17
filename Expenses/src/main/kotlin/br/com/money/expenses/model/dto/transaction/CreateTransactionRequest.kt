package br.com.money.expenses.model.dto.transaction

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.LocalDate

data class CreateTransactionRequestDto (
    @get:JsonProperty("accountId")
    val accountId: Long,
    @get:JsonProperty("amount")
    val amount: Double,
    @get:JsonProperty("type")
    val type: Int,
    @get:JsonProperty("transactionDate")
    val transactionDate: LocalDate,
    @get:JsonProperty("category")
    val category: Int?,
    @get:JsonProperty("description")
    val description: String,
    @get:JsonProperty("comment")
    val comment: String?
) {
    companion object {
        fun CreateTransactionRequestDto.validate() {
            require(amount > 0.0) { "Transaction amount must be greater than zero." }
            require(description.isNotBlank()) { "Transaction description must not be blank." }
            require(transactionDate <= LocalDate.now()) { "Transaction date cannot be in the future." }
        }
    }
}
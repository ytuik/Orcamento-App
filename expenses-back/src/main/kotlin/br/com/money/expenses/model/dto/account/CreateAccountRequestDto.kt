package br.com.money.expenses.model.dto.account

import com.fasterxml.jackson.annotation.JsonProperty

data class CreateAccountRequestDto (
    @get:JsonProperty("name")
    val name: String,
    @get:JsonProperty("balance")
    val balance: Double
) {
    companion object {
        fun CreateAccountRequestDto.validate() {
            require(name.isNotBlank()) { "Account name must not be blank." }
            require(balance >= 0.0) { "Initial balance must be non-negative." }
        }
    }
}

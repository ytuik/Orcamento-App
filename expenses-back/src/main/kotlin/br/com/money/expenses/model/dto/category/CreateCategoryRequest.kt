package br.com.money.expenses.model.dto.category

import br.com.money.expenses.enum.TransactionType
import com.fasterxml.jackson.annotation.JsonProperty

data class CreateCategoryRequest (
    @get:JsonProperty("name")
    val name: String,
    @get:JsonProperty("iconKey")
    val iconKey: String,
    @get:JsonProperty("color")
    val color: String,
    @get:JsonProperty("type")
    val type: TransactionType,
    @get:JsonProperty("isActive")
    val budgetLimit: Double?
) {
    companion object {
        fun CreateCategoryRequest.validate() {
            require(name.isNotBlank()) { "Category name must not be blank." }
            require(iconKey.isNotBlank()) { "Category iconKey must not be blank." }
            require(color.isNotBlank()) { "Category color must not be blank." }
        }
    }
}
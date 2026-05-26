package br.com.money.expenses.model.dto.creditCard

import br.com.money.expenses.model.entity.CreditCard
import com.fasterxml.jackson.annotation.JsonProperty

data class CreditCardDTO (
    @get:JsonProperty("id")
    val id: Long,
    @get:JsonProperty("name")
    val name: String,
    @get:JsonProperty("color")
    val color: String,
    @get:JsonProperty("iconKey")
    val iconKey: String,
    @get:JsonProperty("limit")
    val limit: Double,
    @get:JsonProperty("closingDay")
    val closingDay: Int,
    @get:JsonProperty("dueDate")
    val dueDate: Int,
    @get:JsonProperty("isActive")
    val isActive: Boolean,
    @get:JsonProperty("createdAt")
    val createdAt: String
) {
    companion object {
        fun fromModel(card: CreditCard) = CreditCardDTO(
            id = card.id,
            name = card.name,
            color = card.color,
            iconKey = card.iconKey,
            limit = card.limit,
            closingDay = card.closingDay,
            dueDate = card.dueDate,
            isActive = card.isActive,
            createdAt = card.createdAt.toString()
        )
    }
}
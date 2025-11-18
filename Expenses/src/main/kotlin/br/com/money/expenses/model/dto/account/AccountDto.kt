package br.com.money.expenses.model.dto.account

import br.com.money.expenses.model.entity.Account
import com.fasterxml.jackson.annotation.JsonProperty

data class AccountDto (
    @get:JsonProperty("id")
    val id: Long,
    @get:JsonProperty("name")
    val name: String,
    @get:JsonProperty("isActive")
    val isActive: Boolean,
    @get:JsonProperty("currentBalance")
    val currentBalance: Double,
    @get:JsonProperty("createdAt")
    val createdAt: String,
    @get:JsonProperty("updatedAt")
    val updatedAt: String?
) {
    companion object {
        fun fromModel(account: Account, currentBalance: Double): AccountDto {
            return AccountDto(
                id = account.id,
                name = account.name,
                isActive = account.isActive,
                currentBalance = currentBalance,
                createdAt = account.createdAt.toString(),
                updatedAt = account.updatedAt.toString()
            )
        }
    }
}
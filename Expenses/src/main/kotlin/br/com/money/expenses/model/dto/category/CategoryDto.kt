package br.com.money.expenses.model.dto.category

import br.com.money.expenses.enum.TransactionType
import br.com.money.expenses.model.entity.Category

data class CategoryDto (
    val id: Long,
    val name: String,
    val iconKey: String,
    val color: String,
    val type: TransactionType,
    val isSystem: Boolean,
    val isActive: Boolean,
    val budgetLimit: Double?
) {
    companion object{
        fun fromModel (category: Category) : CategoryDto {
            return CategoryDto(
                id = category.id,
                name = category.name,
                iconKey = category.iconKey,
                color = category.color,
                type = TransactionType.fromId(category.type),
                isSystem = category.isSystem,
                isActive = category.isActive,
                budgetLimit = category.budgetLimit
            )
        }
    }
}
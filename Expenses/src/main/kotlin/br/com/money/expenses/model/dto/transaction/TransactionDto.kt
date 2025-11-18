package br.com.money.expenses.model.dto.transaction

import br.com.money.expenses.enum.TransactionCategory
import br.com.money.expenses.enum.TransactionType
import br.com.money.expenses.model.entity.Transaction

data class TransactionDto(
    val id: Long,
    val accountId: Long,
    val amount: Double,
    val type: TransactionType,
    val transactionDate: String,
    val category: TransactionCategory?,
    val description: String,
    val comment: String?
) {
    companion object {
        fun fromModel(transaction: Transaction): TransactionDto {
            return TransactionDto(
                id = transaction.id,
                accountId = transaction.account.id,
                amount = transaction.transactionAmount,
                type = TransactionType.fromId(transaction.transactionType),
                transactionDate = transaction.transactionDate.toString(),
                category = transaction.category?.let {
                    TransactionCategory.fromId(it)
                },
                description = transaction.description,
                comment = transaction.comment
            )
        }
    }
}
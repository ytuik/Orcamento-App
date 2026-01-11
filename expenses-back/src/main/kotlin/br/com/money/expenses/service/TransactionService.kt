package br.com.money.expenses.service

import br.com.money.expenses.enum.TransactionType
import br.com.money.expenses.model.dto.transaction.CreateTransactionRequestDto
import br.com.money.expenses.model.dto.transaction.TransactionDto
import java.time.LocalDate

interface TransactionService {
    fun createTransaction(
    transaction: CreateTransactionRequestDto
    ): TransactionDto

    fun updateTransaction(
        id: Long,
        accountId: Long,
        amount: Double,
        transactionType: TransactionType,
        description: String,
        transactionDate: LocalDate?,
        categoryId: Long,
        comment: String?
    ): TransactionDto

    fun deleteTransaction(id: Long)

    fun getTransactionById(id: Long): TransactionDto

    fun findTransactionsFiltered(
        accountId: Long?,
        categoryId: Long?,
        type: TransactionType?,
        startDate: LocalDate?,
        endDate: LocalDate?,
        description: String?
    ) : List<TransactionDto>

}
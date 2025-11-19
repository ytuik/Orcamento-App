package br.com.money.expenses.service

import br.com.money.expenses.enum.TransactionCategory
import br.com.money.expenses.enum.TransactionType
import br.com.money.expenses.model.dto.transaction.TransactionDto
import java.time.LocalDate

interface TransactionService {
    fun createTransaction(
        accountId: Long,
        amount: Double,
        transactionType: TransactionType,
        description: String,
        transactionDate: LocalDate?,
        category: TransactionCategory?,
        comment: String?
    ): TransactionDto

    fun updateTransaction(
        id: Int,
        accountId: Long,
        amount: Double,
        transactionType: TransactionType,
        description: String,
        transactionDate: LocalDate?,
        category: TransactionCategory?,
        comment: String?
    ): TransactionDto

    fun deleteTransaction(id: Int)

    fun getTransactionById(id: Int): TransactionDto

    fun findTransactionsFiltered(
        accountId: Long?,
        category: TransactionCategory?,
        type: TransactionType?,
    ) : List<TransactionDto>

    fun findTransactionsByPeriod(
        startDate: LocalDate,
        endDate: LocalDate
    ) : List<TransactionDto>

}
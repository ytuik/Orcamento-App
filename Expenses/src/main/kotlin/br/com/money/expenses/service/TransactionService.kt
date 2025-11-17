package br.com.money.expenses.service

import br.com.money.expenses.enum.TransactionCategory
import br.com.money.expenses.enum.TransactionType
import br.com.money.expenses.model.entity.Transaction
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
    ): Transaction

    fun updateTransaction(
        id: Int,
        accountId: Long,
        amount: Double,
        transactionType: TransactionType,
        description: String,
        transactionDate: LocalDate?,
        category: TransactionCategory?,
        comment: String?
    ): Transaction

    fun deleteTransaction(id: Int)

    fun getTransactionById(id: Int): Transaction

    fun findTransactionsFiltered(
        accountId: Long?,
        category: TransactionCategory?,
        type: TransactionType?,
    ) : List<Transaction>

}
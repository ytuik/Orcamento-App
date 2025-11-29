package br.com.money.expenses.repository

import br.com.money.expenses.model.entity.Transaction
import jakarta.persistence.Tuple
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.time.LocalDate

@Repository
interface TransactionRepository : JpaRepository <Transaction, Int> {
    fun findByAccountId(accountId: Long): List<Transaction>
    fun findByCategoryId(categoryId: Long): List<Transaction>
    fun findByTransactionType(transactionType: Int): List<Transaction>

    @Query("""
        SELECT t FROM Transaction t
        WHERE 
            (:accountId IS NULL OR t.account.id = :accountId)
            AND (:categoryId IS NULL OR t.category.id = :categoryId)
            AND (:typeId IS NULL OR t.transactionType = :typeId)
    """)
    fun findTransactionsFiltered(
        accountId: Long?,
        categoryId: Long?,
        typeId: Int?
    ): List<Transaction>

    @Query("""
        SELECT
            COALESCE(SUM(CASE WHEN t.transactionType = 1 THEN t.transactionAmount ELSE 0 END),0) -
            COALESCE(SUM(CASE WHEN t.transactionType = 2 THEN t.transactionAmount ELSE 0 END),0)
        FROM Transaction t
        WHERE t.account.id = :accountId
    """)
    fun getChangeInBalanceByAccountId(accountId: Long): Double?

    @Query("""
        SELECT
            t.account.id as accountId,
            COALESCE(SUM(CASE WHEN t.transactionType = 1 THEN t.transactionAmount ELSE 0 END),0) -
            COALESCE(SUM(CASE WHEN t.transactionType = 2 THEN t.transactionAmount ELSE 0 END),0) as balance
        FROM Transaction t
        GROUP BY t.account.id
    """)
    fun getSumsByAccountId(): List<Tuple>

    fun findByTransactionDateBetween(startDate: LocalDate, endDate: LocalDate): List<Transaction>
}
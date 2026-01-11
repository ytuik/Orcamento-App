package br.com.money.expenses.repository

import br.com.money.expenses.model.entity.Transaction
import jakarta.persistence.Tuple
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.time.LocalDate

@Repository
interface TransactionRepository : JpaRepository <Transaction, Long> {
    fun findByAccountId(accountId: Long): List<Transaction>
    fun findByCategoryId(categoryId: Long): List<Transaction>
    fun findByTransactionType(transactionType: Long): List<Transaction>

    @Query(value = """
    SELECT * FROM transaction t
    WHERE 
        (COALESCE(:accountId, t.account_id) = t.account_id)
        AND (COALESCE(:categoryId, t.category_id) = t.category_id)
        AND (COALESCE(:typeId, t.transaction_type) = t.transaction_type)
        AND (COALESCE(:startDate, t.transaction_date) <= t.transaction_date)
        AND (COALESCE(:endDate, t.transaction_date) >= t.transaction_date)
        AND (:description IS NULL OR t.description ILIKE '%' || :description || '%')
""", nativeQuery = true)
    fun findTransactionsFiltered(
        accountId: Long?,
        categoryId: Long?,
        typeId: Int?,
        startDate: LocalDate?,
        endDate: LocalDate?,
        description: String?
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
}
package br.com.money.expenses.repository

import br.com.money.expenses.model.entity.CreditCardInstallment
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface CreditCardInstallmentRepository : JpaRepository<CreditCardInstallment, Long> {

    @Query("""
        SELECT ci FROM CreditCardInstallment ci
        JOIN ci.creditCardTransaction ct
        WHERE ct.creditCardCard.id = :creditCardId
          AND ci.billingYear  = :year
          AND ci.billingMonth = :month
          AND ct.isActive = true
        ORDER BY ci.billingYear, ci.billingMonth, ci.installmentNumber
    """)
    fun findByCardAndBillingPeriod(
        @Param("creditCardId") creditCardId: Long,
        @Param("year") year: Int,
        @Param("month") month: Int
    ): List<CreditCardInstallment>

    @Query("""
        SELECT ci FROM CreditCardInstallment ci
        JOIN ci.creditCardTransaction ct
        WHERE ct.creditCardCard.id = :creditCardId
          AND ci.billingYear  = :year
          AND ci.billingMonth = :month
          AND ci.status       = :status
          AND ct.isActive     = true
    """)
    fun findByCardAndBillingPeriodAndStatus(
        @Param("creditCardId") creditCardId: Long,
        @Param("year") year: Int,
        @Param("month") month: Int,
        @Param("status") status: Int
    ): List<CreditCardInstallment>

    @Modifying
    @Query("""
        UPDATE CreditCardInstallment ci
        SET ci.status = :status, ci.paidAt = CURRENT_DATE
        WHERE ci.id IN :ids
    """)
    fun updateStatusByIds(
        @Param("ids") ids: List<Long>,
        @Param("status") status: Int
    )
}

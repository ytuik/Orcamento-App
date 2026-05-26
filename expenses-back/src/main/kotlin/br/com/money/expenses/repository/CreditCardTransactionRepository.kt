package br.com.money.expenses.repository

import br.com.money.expenses.model.entity.CreditCardTransaction
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CreditCardTransactionRepository : JpaRepository<CreditCardTransaction, Long> {
    fun findByCreditCardCardIdAndIsActiveTrue(creditCardId: Long): List<CreditCardTransaction>
}

package br.com.money.expenses.repository

import br.com.money.expenses.model.entity.CreditCard
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CreditCardRepository : JpaRepository<CreditCard, Long> {
    fun findByIsActiveTrue(): List<CreditCard>
}

package br.com.money.expenses.repository

import br.com.money.expenses.model.entity.Transaction
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TransactionRepository : JpaRepository <Transaction, Int> {
}
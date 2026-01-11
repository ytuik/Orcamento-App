package br.com.money.expenses.repository

import br.com.money.expenses.model.entity.Transfer
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TransferRepository : JpaRepository <Transfer, Int> {
}
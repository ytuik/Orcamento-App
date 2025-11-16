package br.com.money.expenses.model.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.Instant

@Entity
@Table(name = "transaction")
data class Transaction(
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(name = "account_id", nullable = false)
    val accountId: Long,

    val transactionAmount: Double,

    @Column(name = "is_debit", nullable = false)
    val isDebit : Boolean,

    @Column(name = "transaction_date", nullable = false)
    val transactionDate: Instant = Instant.now(),

    @Column(name = "category_id")
    val categoryId: Int?,

    val description: String?,
    val comment: String?,
)

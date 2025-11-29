package br.com.money.expenses.model.entity

import jakarta.persistence.*
import java.time.Instant
import java.time.LocalDate

@Entity
@Table(name = "transaction")
data class Transaction(
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    val account: Account,

    val transactionAmount: Double,

    @Column(name = "transaction_type", nullable = false)
    val transactionType : Int,

    @Column(name = "transaction_date", nullable = false)
    val transactionDate: LocalDate,

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = true)
    val category: Category,

    val description: String,
    val comment: String?,
    val createdAt: Instant = Instant.now(),
    val updatedAt: Instant? = null
)

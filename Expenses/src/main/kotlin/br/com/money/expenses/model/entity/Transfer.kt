package br.com.money.expenses.model.entity

import jakarta.persistence.*
import java.time.Instant
import java.time.LocalDate

@Entity
@Table(name = "transfer")
data class Transfer(
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "origin_account_id", nullable = false)
    val originAccount: Account,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_account_id", nullable = false)
    val destinationAccount: Account,

    val amount: Double,
    @Column(name = "transfer_date", nullable = false)
    val transferDate: LocalDate,

    val description: String?,
)

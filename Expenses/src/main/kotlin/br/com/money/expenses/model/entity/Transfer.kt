package br.com.money.expenses.model.entity

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "transfer")
data class Transfer(
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    val originAccountId: Long,
    val destinationAccountId: Long,
    val amount: Double,
    val transferDate: Instant = Instant.now(),
    val description: String?,
)

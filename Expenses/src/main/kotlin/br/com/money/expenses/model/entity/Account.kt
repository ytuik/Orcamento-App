package br.com.money.expenses.model.entity

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "account")
data class Account(
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(name = "name", nullable = false)
    val name: String,

    @Column(name = "balance", nullable = false)
    val balance: Double,

    @Column(name = "is_active", nullable = false)
    val isActive: Boolean = true,

    @Column(name = "created_at", nullable = false)
    val createdAt: Instant = Instant.now(),

    @Column(name = "updated_at")
    val updatedAt: Instant? = null
)
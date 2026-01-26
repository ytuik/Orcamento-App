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

    @Column(name = "initial_balance", nullable = false)
    val initialBalance: Double,

    @Column(name = "is_active", nullable = false)
    val isActive: Boolean = true,

    val color: String,

    @Column(name = "created_at", nullable = false)
    val createdAt: Instant = Instant.now(),
    val updatedAt: Instant? = null,

    @OneToMany(mappedBy = "account", cascade = [CascadeType.ALL])
    val transactions: List<Transaction> = emptyList(),

    @OneToMany(mappedBy = "originAccount")
    val transfersOrigin: List<Transfer> = emptyList(),

    @OneToMany(mappedBy = "destinationAccount")
    val transfersDestination: List<Transfer> = emptyList()
)
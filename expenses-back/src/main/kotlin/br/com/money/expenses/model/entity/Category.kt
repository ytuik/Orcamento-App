package br.com.money.expenses.model.entity

import jakarta.persistence.*

@Entity
@Table(name = "category")
data class Category(
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val name: String,
    val iconKey: String,
    val color: String,

    @Column(name = "type", nullable = false)
    val type: Int,

    @Column(name = "is_system", nullable = false)
    val isSystem: Boolean,

    @Column(name = "is_active", nullable = false)
    val isActive: Boolean,

    val budgetLimit: Double?,
)
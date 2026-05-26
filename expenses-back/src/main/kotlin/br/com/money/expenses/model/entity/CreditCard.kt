package br.com.money.expenses.model.entity

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "credit_card")
data class CreditCard (
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val name: String,
    val color: String,
    val iconKey: String,

    @Column(name = "credit_limit", nullable = false)
    val limit: Double,

    @Column(name = "closing_day", nullable = false)
    val closingDay: Int,

    @Column(name = "due_date", nullable = false)
    val dueDate: Int,

    @Column(name = "is_active", nullable = false)
    val isActive: Boolean,

    @Column(name = "created_at", nullable = false)
    val createdAt: Instant = Instant.now(),

    @OneToMany(mappedBy = "creditCardCard", cascade = [CascadeType.ALL])
    val transactions: List<CreditCardTransaction> = emptyList(),

)

// Adicionar um quadro quais escalas e o objetivo geral de cada uma e o ponto de corte
// antes de comecar os subtopicos colocar um diagrama geral no que foi feito no trabalho
// um fluxograma dos servicos
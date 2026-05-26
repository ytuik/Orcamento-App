package br.com.money.expenses.model.entity

import jakarta.persistence.*
import java.time.Instant
import java.time.LocalDate

@Entity
@Table(name = "credit_card_transaction")
data class CreditCardTransaction (
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "credit_card_id", nullable = false)
    val creditCardCard: CreditCard,

    @Column(nullable = false)
    val description: String,

    @Column(nullable = false)
    val establishment: String,

    @Column(name = "total_amount", nullable = false)
    val totalAmount: Double,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = true)
    val category: Category?,

    @Column(name = "transaction_date", nullable = false)
    val transactionDate: LocalDate,

    @Column(name = "number_of_installments", nullable = false)
    val numberOfInstallments: Int,

    @Column(name = "is_active", nullable = false)
    val isActive: Boolean,

    @Column(name = "created_at", nullable = false)
    val createdAt: Instant = Instant.now(),

    @OneToMany(mappedBy = "creditCardTransaction", cascade = [CascadeType.ALL])
    val installments: List<CreditCardInstallment> = emptyList(),
)
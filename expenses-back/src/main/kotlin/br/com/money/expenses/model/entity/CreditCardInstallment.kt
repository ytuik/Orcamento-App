package br.com.money.expenses.model.entity

import br.com.money.expenses.enum.CreditCardInstallmentStatus
import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name = "credit_card_installment")
data class CreditCardInstallment (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "credit_card_transaction_id", nullable = false)
    val creditCardTransaction: CreditCardTransaction,

    @Column(name = "installment_number", nullable = false)
    val installmentNumber: Int,

    @Column(name = "amount", nullable = false)
    val amount: Double, //Total amount / number of installments

    @Column(name = "billing_year", nullable = false)
    val billingYear: Int,

    @Column(name = "billing_month", nullable = false)
    val billingMonth: Int,

    val status: Int = CreditCardInstallmentStatus.OPEN.id,

    @Column(name = "paid_at")
    val paidAt: LocalDate? = null,
)
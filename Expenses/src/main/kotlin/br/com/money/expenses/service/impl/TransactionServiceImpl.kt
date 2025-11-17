package br.com.money.expenses.service.impl

import br.com.money.expenses.enum.TransactionCategory
import br.com.money.expenses.enum.TransactionType
import br.com.money.expenses.exceptions.AccountNotFoundException
import br.com.money.expenses.model.entity.Transaction
import br.com.money.expenses.repository.AccountRepository
import br.com.money.expenses.repository.TransactionRepository
import br.com.money.expenses.service.TransactionService
import org.springframework.stereotype.Service
import java.time.Instant
import java.time.LocalDate

@Service
class TransactionServiceImpl(
    private val transactionRepository: TransactionRepository,
    private val accountRepository: AccountRepository
) : TransactionService {

    override fun createTransaction(
        accountId: Long,
        amount: Double,
        transactionType: TransactionType,
        description: String,
        transactionDate: LocalDate?,
        category: TransactionCategory?,
        comment: String?
    ): Transaction {

        if(!accountRepository.existsById(accountId)) {
            throw AccountNotFoundException(accountId)
        }

        val newTransaction = transactionRepository.save(
            Transaction(
                accountId = accountId,
                transactionAmount = amount,
                transactionType = transactionType.id,
                transactionDate = transactionDate ?: LocalDate.now(),
                category = category!!.id,
                description = description,
                comment = comment
            )
        )

        return newTransaction
    }

    override fun updateTransaction(
        id: Int,
        accountId: Long,
        amount: Double,
        transactionType: TransactionType,
        description: String,
        transactionDate: LocalDate?,
        category: TransactionCategory?,
        comment: String?
    ): Transaction {
        val existingTransaction = transactionRepository.findById(id.toInt()).orElseThrow {
            IllegalArgumentException("Transaction with id $id not found")
        }

        if(accountId != existingTransaction.accountId && !accountRepository.existsById(accountId)) {
            throw AccountNotFoundException(accountId)
        }

        val updatedTransaction = existingTransaction.copy(
            accountId = accountId,
            transactionAmount = amount,
            transactionType = transactionType.id,
            transactionDate = transactionDate ?: existingTransaction.transactionDate,
            category = category?.id ?: existingTransaction.category,
            description = description,
            comment = comment,
            updatedAt = Instant.now()
        )

        return transactionRepository.save(updatedTransaction)
    }

    override fun deleteTransaction(id: Int) {
        val existingTransaction = transactionRepository.findById(id).orElseThrow {
            IllegalArgumentException("Transaction with id $id not found")
        }
        transactionRepository.delete(existingTransaction)
    }

    override fun getTransactionById(id: Int): Transaction {
        return transactionRepository.findById(id).orElseThrow {
            IllegalArgumentException("Transaction with id $id not found")
        }
    }

    override fun findTransactionsFiltered(
        accountId: Long?,
        category: TransactionCategory?,
        type: TransactionType?
    ): List<Transaction> {
        return transactionRepository.findTransactionsFiltered(
            accountId,
            category?.id,
            type?.id
        )
    }

}
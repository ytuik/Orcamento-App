package br.com.money.expenses.service.impl

import br.com.money.expenses.enum.TransactionCategory
import br.com.money.expenses.enum.TransactionType
import br.com.money.expenses.exceptions.AccountNotFoundException
import br.com.money.expenses.model.dto.transaction.TransactionDto
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
    ): TransactionDto {

        val account = accountRepository.findById(accountId).orElseThrow {
            AccountNotFoundException(accountId)
        }

        val newTransaction = transactionRepository.save(
            Transaction(
                account = account,
                transactionAmount = amount,
                transactionType = transactionType.id,
                transactionDate = transactionDate ?: LocalDate.now(),
                category = category!!.id,
                description = description,
                comment = comment
            )
        )

        return TransactionDto.fromModel(newTransaction)
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
    ): TransactionDto {
        val existingTransaction = transactionRepository.findById(id.toInt()).orElseThrow {
            IllegalArgumentException("Transaction with id $id not found")
        }

        val account = accountRepository.findById(accountId).orElseThrow {
            AccountNotFoundException(accountId)
        }

        if(accountId != existingTransaction.account.id) {
            throw AccountNotFoundException(accountId)
        }

        val updatedTransaction = transactionRepository.save(
            existingTransaction.copy(
                account = account,
                transactionAmount = amount,
                transactionType = transactionType.id,
                transactionDate = transactionDate ?: existingTransaction.transactionDate,
                category = category?.id ?: existingTransaction.category,
                description = description,
                comment = comment,
                updatedAt = Instant.now()
            )
        )

        return TransactionDto.fromModel(updatedTransaction)
    }

    override fun deleteTransaction(id: Int) {
        val existingTransaction = transactionRepository.findById(id).orElseThrow {
            IllegalArgumentException("Transaction with id $id not found")
        }
        transactionRepository.delete(existingTransaction)
    }

    override fun getTransactionById(id: Int): TransactionDto {
        val transaction = transactionRepository.findById(id).orElseThrow {
            IllegalArgumentException("Transaction with id $id not found")
        }

        return TransactionDto.fromModel(transaction)
    }

    override fun findTransactionsFiltered(
        accountId: Long?,
        category: TransactionCategory?,
        type: TransactionType?
    ): List<TransactionDto> {
        val transactions = transactionRepository.findTransactionsFiltered(
            accountId,
            category?.id,
            type?.id
        )

        return transactions.map {
            TransactionDto.fromModel(it)
        }
    }

    override fun findTransactionsByPeriod(startDate: LocalDate, endDate: LocalDate): List<TransactionDto> {
        val transactions = transactionRepository.findByTransactionDateBetween(startDate, endDate)

        return transactions.map {
            TransactionDto.fromModel(it)
        }
    }

}
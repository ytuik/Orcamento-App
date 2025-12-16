package br.com.money.expenses.service.impl

import br.com.money.expenses.enum.TransactionType
import br.com.money.expenses.exceptions.AccountNotFoundException
import br.com.money.expenses.exceptions.CategoryNotFoundException
import br.com.money.expenses.exceptions.TransactionNotFoundException
import br.com.money.expenses.model.dto.transaction.CreateTransactionRequestDto
import br.com.money.expenses.model.dto.transaction.TransactionDto
import br.com.money.expenses.model.entity.Transaction
import br.com.money.expenses.repository.AccountRepository
import br.com.money.expenses.repository.CategoryRepository
import br.com.money.expenses.repository.TransactionRepository
import br.com.money.expenses.service.TransactionService
import org.springframework.stereotype.Service
import java.time.Instant
import java.time.LocalDate

@Service
class TransactionServiceImpl(
    private val transactionRepository: TransactionRepository,
    private val accountRepository: AccountRepository,
    private val categoryRepository: CategoryRepository
) : TransactionService {

    override fun createTransaction(
        transaction: CreateTransactionRequestDto
    ): TransactionDto {

        val account = accountRepository.findById(transaction.accountId).orElseThrow {
            AccountNotFoundException(transaction.accountId)
        }

        val category = categoryRepository.findById(transaction.categoryId).orElseThrow {
            CategoryNotFoundException(transaction.categoryId)
        }

        val newTransaction = transactionRepository.save(
            Transaction(
                account = account,
                transactionAmount = transaction.amount,
                transactionType = transaction.type.id,
                transactionDate = transaction.transactionDate,
                category = category,
                description = transaction.description,
                comment = transaction.comment
            )
        )

        return TransactionDto.fromModel(newTransaction)
    }

    override fun updateTransaction(
        id: Long,
        accountId: Long,
        amount: Double,
        transactionType: TransactionType,
        description: String,
        transactionDate: LocalDate?,
        categoryId: Long,
        comment: String?
    ): TransactionDto {
        val existingTransaction = transactionRepository.findById(id).orElseThrow {
            TransactionNotFoundException(id)
        }

        val account = accountRepository.findById(accountId).orElseThrow {
            AccountNotFoundException(accountId)
        }

        val category = categoryRepository.findById(categoryId).orElseThrow {
            CategoryNotFoundException(categoryId)
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
                category = category ?: existingTransaction.category,
                description = description,
                comment = comment,
                updatedAt = Instant.now()
            )
        )

        return TransactionDto.fromModel(updatedTransaction)
    }

    override fun deleteTransaction(id: Long) {
        val existingTransaction = transactionRepository.findById(id).orElseThrow {
            IllegalArgumentException("Transaction with id $id not found")
        }
        transactionRepository.delete(existingTransaction)
    }

    override fun getTransactionById(id: Long): TransactionDto {
        val transaction = transactionRepository.findById(id).orElseThrow {
            IllegalArgumentException("Transaction with id $id not found")
        }

        return TransactionDto.fromModel(transaction)
    }

    override fun findTransactionsFiltered(
        accountId: Long?,
        categoryId: Long?,
        type: TransactionType?,
        startDate: LocalDate?,
        endDate: LocalDate?,
        description: String?
    ): List<TransactionDto> {
        val transactions = transactionRepository.findTransactionsFiltered(
            accountId,
            categoryId,
            type?.id,
            startDate,
            endDate,
            description?.lowercase()
        )

        return transactions.map {
            TransactionDto.fromModel(it)
        }
    }
}
package br.com.money.expenses.controller

import br.com.money.expenses.enum.TransactionCategory
import br.com.money.expenses.enum.TransactionType
import br.com.money.expenses.model.dto.transaction.CreateTransactionRequestDto
import br.com.money.expenses.model.dto.transaction.CreateTransactionRequestDto.Companion.validate
import br.com.money.expenses.model.dto.transaction.TransactionDto
import br.com.money.expenses.service.TransactionService
import org.springframework.web.bind.annotation.*
import java.time.LocalDate

@RestController
@RequestMapping("/api/transaction")
class TransactionController (
    private val transactionService: TransactionService
){
    @PostMapping
    fun createTransaction(
        @RequestBody
        request: CreateTransactionRequestDto
    ) : TransactionDto {

        request.validate()
        val newTransaction = transactionService.createTransaction(
            accountId = request.accountId,
            amount = request.amount,
            transactionType = TransactionType.fromId(request.type),
            transactionDate = request.transactionDate,
            category = request.category?.let { TransactionCategory.fromId(it) },
            description = request.description,
            comment = request.comment
        )

        return TransactionDto.fromModel(newTransaction)
    }

    @GetMapping("/{id}")
    fun getTransactionById(
        @PathVariable id: Int
    ) : TransactionDto {
        if (id <= 0) {
            throw IllegalArgumentException("Invalid transaction ID: $id")
        }

        val transaction = transactionService.getTransactionById(id)
        return TransactionDto.fromModel(transaction)
    }

    @PatchMapping("/{id}/update")
    fun updateTransaction(
        @PathVariable id: Int,
        @RequestBody
        request: TransactionDto
    ) : TransactionDto {
        if (id <= 0) {
            throw IllegalArgumentException("Invalid transaction ID: $id")
        }

        val updatedTransaction = transactionService.updateTransaction(
            id = id,
            accountId = request.accountId,
            amount = request.amount,
            transactionType = request.type,
            transactionDate = LocalDate.parse(request.transactionDate),
            category = request.category,
            description = request.description,
            comment = request.comment
        )

        return TransactionDto.fromModel(updatedTransaction)
    }

    @DeleteMapping("/{id}/delete")
    fun deleteTransaction(
        @PathVariable id: Int
    ) {
        if (id <= 0) {
            throw IllegalArgumentException("Invalid transaction ID: $id")
        }

        transactionService.deleteTransaction(id)
    }

    @GetMapping
    fun getTransactions(
        @RequestParam(required = false) accountId: Long?,
        @RequestParam(required = false) categoryId: Int?,
        @RequestParam(required = false) typeId: Int?
    ) : List<TransactionDto> {

        val category = categoryId?.let { TransactionCategory.fromId(it) }
        val type = typeId?.let { TransactionType.fromId(it) }

        val transactions = transactionService.findTransactionsFiltered(
            accountId = accountId,
            category = category,
            type = type
        )

        return transactions.map { TransactionDto.fromModel(it) }
    }
}
package br.com.money.expenses.controller

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
        return transactionService.createTransaction(request)
    }

    @GetMapping("/{id}")
    fun getTransactionById(
        @PathVariable id: Int
    ) : TransactionDto {

        if (id <= 0) {
            throw IllegalArgumentException("Invalid transaction ID: $id")
        }

        return transactionService.getTransactionById(id)
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

        return transactionService.updateTransaction(
            id = id,
            accountId = request.accountId,
            amount = request.amount,
            transactionType = request.type,
            transactionDate = LocalDate.parse(request.transactionDate),
            categoryId = request.category,
            description = request.description,
            comment = request.comment
        )
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
        @RequestParam(required = false) categoryId: Long?,
        @RequestParam(required = false) typeId: Int?
    ) : List<TransactionDto> {

        val type = typeId?.let { TransactionType.fromId(it) }

        return transactionService.findTransactionsFiltered(
            accountId = accountId,
            category = categoryId,
            type = type
        )

    }

    @GetMapping("/period")
    fun getTransactionsByPeriod(
        @RequestParam(required = true) startDate: LocalDate,
        @RequestParam(required = true) endDate: LocalDate
    ) : List<TransactionDto> {

        return transactionService.findTransactionsByPeriod(
            startDate = startDate,
            endDate = endDate
        )
    }
}
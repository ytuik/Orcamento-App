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

        return transactionService.getTransactionById(id.toLong())
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
            id = id.toLong(),
            accountId = request.accountId,
            amount = request.amount,
            transactionType = request.type,
            transactionDate = LocalDate.parse(request.transactionDate),
            categoryId = request.categoryId,
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

        transactionService.deleteTransaction(id.toLong())
    }

    @GetMapping("/search")
    fun searchTransactions(
        @RequestParam(required = false) accountId: Long?,
        @RequestParam(required = false) categoryId: Long?,
        @RequestParam(required = false) type: String?,
        @RequestParam(required = false) startDate: LocalDate?,
        @RequestParam(required = false) endDate: LocalDate?,
        @RequestParam(name = "searchTerms",required = false) search: String?
    ) : List<TransactionDto> {
        val transactionType = type?.let {
            try { TransactionType.valueOf(it.uppercase()) } catch (e: Exception) { null }
        }

        return transactionService.findTransactionsFiltered(
            accountId = accountId,
            categoryId = categoryId,
            type = transactionType,
            startDate = startDate,
            endDate = endDate,
            description = search
        )
    }
}
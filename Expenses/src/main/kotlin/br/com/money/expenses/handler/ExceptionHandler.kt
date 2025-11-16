package br.com.money.expenses.handler

import br.com.money.expenses.exceptions.AccountNotFoundException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.ErrorResponse
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

@ControllerAdvice
class ExceptionHandler {

    @ExceptionHandler(AccountNotFoundException::class)
    fun handleAccountNotFoundException(ex: AccountNotFoundException): ResponseEntity<ErrorResponse> {
        val errorResponse = ErrorResponse.builder(ex, HttpStatus.NOT_FOUND, "ACCOUNT_NOT_FOUND")
            .build()

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(errorResponse)
    }
}
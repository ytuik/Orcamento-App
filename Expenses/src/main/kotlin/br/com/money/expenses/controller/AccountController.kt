package br.com.money.expenses.controller

import br.com.money.expenses.model.dto.account.AccountDto
import br.com.money.expenses.model.dto.account.CreateAccountRequestDto
import br.com.money.expenses.model.dto.account.CreateAccountRequestDto.Companion.validate
import br.com.money.expenses.service.AccountService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/account")
class AccountController (
    private val accountService : AccountService
){
    @PostMapping
    fun createAccount(
        @RequestBody
        request: CreateAccountRequestDto
    ) : AccountDto {

        request.validate()
        val newAccount = accountService.createAccount(request)
        return AccountDto.fromModel(newAccount)

    }

    @GetMapping("/{id}")
    fun getAccountById(
        @PathVariable id: Long
    ) : AccountDto {
        if (id <= 0L) {
            throw IllegalArgumentException("Invalid account ID: $id")
        }

        val account = accountService.getAccountById(id)
        return AccountDto.fromModel(account)
    }

    @PatchMapping("/{id}/deactivate")
    fun deactivateAccount(
        @PathVariable id: Long
    ) : AccountDto {
        if (id <= 0L) {
            throw IllegalArgumentException("Invalid account ID: $id")
        }

        val account = accountService.deactivateAccount(id)
        return AccountDto.fromModel(account)
    }

    @GetMapping("/health")
    fun healthCheck(): String {
        return "Account Service is up and running!"
    }
}
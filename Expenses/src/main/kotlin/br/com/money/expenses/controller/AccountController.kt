package br.com.money.expenses.controller

import br.com.money.expenses.model.dto.account.AccountDto
import br.com.money.expenses.model.dto.account.CreateAccountRequestDto
import br.com.money.expenses.model.dto.account.CreateAccountRequestDto.Companion.validate
import br.com.money.expenses.service.AccountService
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
        return accountService.createAccount(request)

    }
}
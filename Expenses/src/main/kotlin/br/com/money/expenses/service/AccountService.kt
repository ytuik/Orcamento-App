package br.com.money.expenses.service

import br.com.money.expenses.model.dto.account.CreateAccountRequestDto
import br.com.money.expenses.model.entity.Account

interface AccountService {
   fun getAccountById(id: Long): Account

   fun createAccount(account: CreateAccountRequestDto): Account

   fun deactivateAccount(id: Long) : Account
}
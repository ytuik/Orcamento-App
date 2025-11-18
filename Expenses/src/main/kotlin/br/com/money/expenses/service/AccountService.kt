package br.com.money.expenses.service

import br.com.money.expenses.model.dto.account.AccountDto

interface AccountService {
   fun getAllAccounts(): List<AccountDto>

   fun getAccountById(id: Long): AccountDto

   fun createAccount(
      name: String,
      balance: Double
   ): AccountDto

   fun deactivateAccount(id: Long) : AccountDto
}
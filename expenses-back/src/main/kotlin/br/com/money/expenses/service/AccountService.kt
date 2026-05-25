package br.com.money.expenses.service

import br.com.money.expenses.model.dto.account.AccountDto

interface AccountService {
   fun getAllAccounts(): List<AccountDto>

   fun getAccountById(id: Long): AccountDto

   fun createAccount(
      name: String,
      balance: Double,
      color: String
   ): AccountDto

   fun deactivateAccount(id: Long) : AccountDto

   fun updateAccount(
      id: Long,
      name: String,
      color: String
   ) : AccountDto

   fun updateBaseAmount(
      id: Long,
      newBaseAmount: Double
   ) : AccountDto
}
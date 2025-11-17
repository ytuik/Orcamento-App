package br.com.money.expenses.service

import br.com.money.expenses.model.entity.Account

interface AccountService {
   fun getAllAccounts(): List<Account>

   fun getAccountById(id: Long): Account

   fun createAccount(
      name: String,
      balance: Double
   ): Account

   fun deactivateAccount(id: Long) : Account
}
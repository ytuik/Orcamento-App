package br.com.money.expenses.exceptions

class AccountNotFoundException(accountId: Long) :
    RuntimeException("Account not found with id: $accountId")
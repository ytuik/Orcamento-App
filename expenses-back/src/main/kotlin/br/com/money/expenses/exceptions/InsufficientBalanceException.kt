package br.com.money.expenses.exceptions

import java.math.BigDecimal

class InsufficientBalanceException(accountId: Long, balance: BigDecimal, required: BigDecimal) :
    RuntimeException("Account $accountId has insufficient balance: $balance, required: $required")
package br.com.money.expenses.exceptions

class TransactionNotFoundException(transactionId: Long) :
    RuntimeException("Transaction not found with id: $transactionId")
package br.com.money.expenses.exceptions

class TransactionNotFoundException(transactionId: Int) :
    RuntimeException("Transaction not found with id: $transactionId")
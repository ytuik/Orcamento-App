package br.com.money.expenses.exceptions

class CreditCardNotFoundException (id: Long):
    RuntimeException("Credit card not found with id: $id")

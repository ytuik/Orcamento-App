package br.com.money.expenses.exceptions

class CategoryNotFoundException(categoryId: Long) :
    RuntimeException("Category not found with id: $categoryId")
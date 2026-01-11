package br.com.money.expenses.service

import br.com.money.expenses.model.dto.category.CategoryDto
import br.com.money.expenses.model.dto.category.CreateCategoryRequest

interface CategoryService {
    fun getAllCategories(): List<CategoryDto>
    fun getCategoriesByType(type: Int): List<CategoryDto>
    fun createCategory(category: CreateCategoryRequest): CategoryDto
    fun updateCategory(id: Long, category: CategoryDto): CategoryDto
    fun deactivateCategory(id: Long): CategoryDto
}
package br.com.money.expenses.repository

import br.com.money.expenses.model.entity.Category
import org.springframework.data.jpa.repository.JpaRepository

interface CategoryRepository : JpaRepository<Category, Long> {
    fun findByType(type: Int): List<Category>
}
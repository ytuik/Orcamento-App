package br.com.money.expenses.service.impl

import br.com.money.expenses.exceptions.CategoryNotFoundException
import br.com.money.expenses.model.dto.category.CategoryDto
import br.com.money.expenses.model.dto.category.CreateCategoryRequest
import br.com.money.expenses.model.entity.Category
import br.com.money.expenses.repository.CategoryRepository
import br.com.money.expenses.service.CategoryService
import org.springframework.stereotype.Service

@Service
class CategoryServiceImpl(
    private val categoryRepository: CategoryRepository,
) : CategoryService {
    override fun getAllCategories(): List<CategoryDto> {
        return categoryRepository.findAll().map { CategoryDto.fromModel(it) }
    }

    override fun getCategoriesByType(type: Int): List<CategoryDto> {
        return categoryRepository.findByType(type).map { CategoryDto.fromModel(it) }
    }

    override fun createCategory(category: CreateCategoryRequest): CategoryDto {
        val newCategory = categoryRepository.save(
            Category(
                name = category.name,
                iconKey = category.iconKey,
                color = category.color,
                type = category.type.id,
                isSystem = false,
                isActive = true,
                budgetLimit = category.budgetLimit
            )
        )
        return newCategory.let { CategoryDto.fromModel(it) }
    }

    override fun updateCategory(id: Long, category: CategoryDto): CategoryDto {
        val existingCategory = categoryRepository.findById(id).orElseThrow {
            CategoryNotFoundException(id)
        }

        val updatedCategory = existingCategory.copy(
            name = category.name,
            iconKey = category.iconKey,
            color = category.color,
            type = category.type.id,
            isSystem = category.isSystem,
            isActive = category.isActive,
            budgetLimit = category.budgetLimit
        )

        val savedCategory = categoryRepository.save(updatedCategory)
        return CategoryDto.fromModel(savedCategory)
    }

    override fun deactivateCategory(id: Long): CategoryDto {
        val existingCategory = categoryRepository.findById(id).orElseThrow {
            CategoryNotFoundException(id)
        }

        val deactivatedCategory = existingCategory.copy(
            isActive = false
        )

        val savedCategory = categoryRepository.save(deactivatedCategory)
        return CategoryDto.fromModel(savedCategory)
    }

}
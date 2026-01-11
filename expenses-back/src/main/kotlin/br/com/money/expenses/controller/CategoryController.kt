package br.com.money.expenses.controller;

import br.com.money.expenses.model.dto.category.CategoryDto
import br.com.money.expenses.model.dto.category.CreateCategoryRequest
import br.com.money.expenses.model.dto.category.CreateCategoryRequest.Companion.validate
import br.com.money.expenses.service.CategoryService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/category")
class CategoryController (
    private val categoryService: CategoryService
){
    @PostMapping
    fun createCategory(
        @RequestBody
        request: CreateCategoryRequest
    ) : CategoryDto {
        request.validate()
        return categoryService.createCategory(request)
    }

    @PatchMapping("/{id}")
    fun updateCategory(
        @PathVariable id: Long,
        @RequestBody
        request: CategoryDto
        ) : CategoryDto {

        return categoryService.updateCategory(id, request)
    }

    @GetMapping
    fun getAllCategories() : List<CategoryDto> {
        return categoryService.getAllCategories()
    }

    @GetMapping("/type/{type}")
    fun getCategoriesByType(
        @PathVariable type: Int
    ) : List<CategoryDto> {
        return categoryService.getCategoriesByType(type)
    }

    @PatchMapping("/{id}/deactivate")
    fun deactivateCategory(
        @PathVariable id: Long
    ) : CategoryDto {
        return categoryService.deactivateCategory(id)
    }
}

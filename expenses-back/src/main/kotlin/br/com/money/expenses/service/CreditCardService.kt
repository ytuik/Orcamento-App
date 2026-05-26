package br.com.money.expenses.service

import br.com.money.expenses.model.dto.creditCard.CreateCreditCardRequestDTO
import br.com.money.expenses.model.dto.creditCard.CreditCardDTO

interface CreditCardService {
    fun getAllCreditCards(): List<CreditCardDTO>
    fun getCreditCardById(id: Long): CreditCardDTO
    fun createCreditCard(request: CreateCreditCardRequestDTO): CreditCardDTO
    fun updateCreditCard(id: Long, request: CreateCreditCardRequestDTO): CreditCardDTO
    fun deleteCreditCard(id: Long): CreditCardDTO
}
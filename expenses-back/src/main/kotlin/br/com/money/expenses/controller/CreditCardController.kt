package br.com.money.expenses.controller

import br.com.money.expenses.model.dto.creditCard.CreateCreditCardRequestDTO
import br.com.money.expenses.service.CreditCardService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/credit-card")
class CreditCardController(private val creditCardService: CreditCardService) {

    @GetMapping
    fun getAll() = ResponseEntity.ok(creditCardService.getAllCreditCards())

    @GetMapping("/{id}")
    fun getById(@PathVariable id: Long) =
        ResponseEntity.ok(creditCardService.getCreditCardById(id))

    @PostMapping
    fun create(@RequestBody request: CreateCreditCardRequestDTO) =
        ResponseEntity.status(HttpStatus.CREATED).body(creditCardService.createCreditCard(request))

    @PatchMapping("/{id}")
    fun update(@PathVariable id: Long, @RequestBody request: CreateCreditCardRequestDTO) =
        ResponseEntity.ok(creditCardService.updateCreditCard(id, request))

    @PatchMapping("/{id}/deactivate")
    fun deactivate(@PathVariable id: Long) =
        ResponseEntity.ok(creditCardService.deleteCreditCard(id))
}

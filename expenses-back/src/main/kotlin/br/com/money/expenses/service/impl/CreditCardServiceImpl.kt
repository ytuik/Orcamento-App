package br.com.money.expenses.service.impl

import br.com.money.expenses.exceptions.CreditCardNotFoundException
import br.com.money.expenses.model.dto.creditCard.CreateCreditCardRequestDTO
import br.com.money.expenses.model.dto.creditCard.CreditCardDTO
import br.com.money.expenses.model.entity.CreditCard
import br.com.money.expenses.repository.CreditCardRepository
import br.com.money.expenses.service.CreditCardService
import org.springframework.stereotype.Service

@Service
class CreditCardServiceImpl(private val creditCardRepository: CreditCardRepository) : CreditCardService {
    override fun getAllCreditCards(): List<CreditCardDTO> {
        return creditCardRepository.findByIsActiveTrue().map {
            CreditCardDTO.fromModel(it)
        }
    }

    override fun getCreditCardById(id: Long) : CreditCardDTO {
        val card = creditCardRepository.findById(id).orElseThrow {
            CreditCardNotFoundException(id)
        }
        return CreditCardDTO.fromModel(card)
    }

    override fun createCreditCard(request: CreateCreditCardRequestDTO): CreditCardDTO {
        val card = creditCardRepository.save(
            CreditCard(
                name = request.name,
                color = request.color,
                iconKey = request.iconKey,
                limit = request.limit,
                closingDay = request.closingDay,
                dueDate = request.dueDate,
                isActive = true
            )
        )
        return CreditCardDTO.fromModel(card)
    }

    override fun updateCreditCard(id: Long, request: CreateCreditCardRequestDTO): CreditCardDTO {
        val card = creditCardRepository.findById(id).orElseThrow {
            CreditCardNotFoundException(id)
        }
        val updated = creditCardRepository.save(
            card.copy(
                name       = request.name,
                color      = request.color,
                iconKey    = request.iconKey,
                limit      = request.limit,
                closingDay = request.closingDay,
                dueDate    = request.dueDate
            )
        )
        return CreditCardDTO.fromModel(updated)
    }

    override fun deleteCreditCard(id: Long): CreditCardDTO {
        val card = creditCardRepository.findById(id).orElseThrow {
            CreditCardNotFoundException(id)
        }
        val deactivated = creditCardRepository.save(card.copy(isActive = false))
        return CreditCardDTO.fromModel(deactivated)
    }
}
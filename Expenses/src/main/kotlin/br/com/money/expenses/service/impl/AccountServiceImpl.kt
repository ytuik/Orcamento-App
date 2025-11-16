package br.com.money.expenses.service.impl

import br.com.money.expenses.exceptions.AccountNotFoundException
import br.com.money.expenses.model.dto.account.CreateAccountRequestDto
import br.com.money.expenses.model.entity.Account
import br.com.money.expenses.repository.AccountRepository
import br.com.money.expenses.service.AccountService
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class AccountServiceImpl (
   private val accountRepository : AccountRepository
) : AccountService {

    override fun getAccountById(id: Long): Account = accountRepository.findById(id).orElseThrow{
        AccountNotFoundException(id)
    }

    override fun createAccount(account: CreateAccountRequestDto) : Account {
        val newAccount = Account(
            name = account.name,
            initialBalance = account.balance,
            isActive = true,
        )
        return accountRepository.save(newAccount)

    }

    override fun deactivateAccount(id: Long): Account {
        val account = getAccountById(id)
        val deactivatedAccount = accountRepository.save(
            account.copy(
                isActive = false,
                updatedAt = Instant.now()
                )
            )
        return deactivatedAccount
    }
}
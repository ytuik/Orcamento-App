package br.com.money.expenses.service.impl

import br.com.money.expenses.exceptions.AccountNotFoundException
import br.com.money.expenses.model.dto.account.AccountDto
import br.com.money.expenses.model.dto.account.CreateAccountRequestDto
import br.com.money.expenses.model.entity.Account
import br.com.money.expenses.repository.AccountRepository
import br.com.money.expenses.service.AccountService
import org.springframework.stereotype.Service
import java.sql.Timestamp
import java.time.Instant

@Service
class AccountServiceImpl (
   private val accountRepository : AccountRepository
) : AccountService {

    override fun getAccountById(id: Long): Account = accountRepository.findById(id).orElseThrow{
        AccountNotFoundException(id)
    }

    override fun createAccount(account: CreateAccountRequestDto) : AccountDto {
        val newAccount = Account(
            name = account.name,
            initialBalance = account.balance,
            isActive = true,
        )
        val result = accountRepository.save(newAccount)

        return AccountDto.fromModel(result)
    }

    override fun deleteAccount(id: Long): Boolean {
        return if (accountRepository.existsById(id)) {
            accountRepository.deleteById(id)
            true
        } else {
            false
        }
    }
}
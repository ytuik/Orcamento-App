package br.com.money.expenses.service.impl

import br.com.money.expenses.exceptions.AccountNotFoundException
import br.com.money.expenses.model.dto.account.AccountDto
import br.com.money.expenses.model.entity.Account
import br.com.money.expenses.repository.AccountRepository
import br.com.money.expenses.repository.TransactionRepository
import br.com.money.expenses.service.AccountService
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class AccountServiceImpl (
    private val accountRepository : AccountRepository,
    private val transactionRepository: TransactionRepository
) : AccountService {

    override fun getAllAccounts(): List<AccountDto> {
        val accounts = accountRepository.findAll()
        val transactionSums = transactionRepository.getSumsByAccountId()
        val balancesByAccount = transactionSums.associate {
            it.get("accountId", Long::class.java) to it.get("balance", Double::class.java)
        }
        return accounts.map {
            val sumOfTransactions = balancesByAccount[it.id] ?: 0.0
            val currentBalance = it.initialBalance + sumOfTransactions

            AccountDto.fromModel(it, currentBalance)
        }
    }

    override fun getAccountById(id: Long): AccountDto {
        val account = accountRepository.findById(id).orElseThrow {
            AccountNotFoundException(id)
        }

        val currentBalance = calculateCurrentBalance(account)

        return AccountDto.fromModel(account, currentBalance)
    }

    override fun createAccount(name: String, balance: Double, color: String) : AccountDto {
        val newAccount =  accountRepository.save(Account(
            name = name,
            initialBalance = balance,
            isActive = true,
            color = color
            )
        )
        return AccountDto.fromModel(newAccount, newAccount.initialBalance)

    }

    override fun deactivateAccount(id: Long): AccountDto {
        val account = accountRepository.findById(id).orElseThrow {
            AccountNotFoundException(id)
        }

        val deactivatedAccount = accountRepository.save(
            account.copy(
                isActive = false,
                updatedAt = Instant.now()
                )
            )
        return AccountDto.fromModel(deactivatedAccount, calculateCurrentBalance(deactivatedAccount))
    }

    private fun calculateCurrentBalance(account: Account): Double {
        val balance = transactionRepository.getChangeInBalanceByAccountId(account.id) ?: 0.0
        return account.initialBalance + balance
    }
}
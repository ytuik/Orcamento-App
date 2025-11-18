//package br.com.money.expenses.config
//
//import br.com.money.expenses.enum.TransactionCategory
//import br.com.money.expenses.enum.TransactionType
//import br.com.money.expenses.model.entity.Account
//import br.com.money.expenses.model.entity.Transaction
//import br.com.money.expenses.repository.AccountRepository
//import br.com.money.expenses.repository.TransactionRepository
//import org.springframework.boot.CommandLineRunner
//import org.springframework.stereotype.Component
//import java.time.LocalDate
//
//@Component
//class MockDataLoader(
//    private val accountRepository: AccountRepository,
//    private val transactionRepository: TransactionRepository
//) : CommandLineRunner {
//    override fun run(vararg args: String?) {
//        // Create mock accounts
//        val account1 = accountRepository.save(Account(name = "Checking", initialBalance = 1000.0))
//        val account2 = accountRepository.save(Account(name = "Savings", initialBalance = 5000.0))
//
//        // Create mock transactions for account1
//        transactionRepository.save(
//            Transaction(
//                account = account1,
//                transactionAmount = 100.0,
//                transactionType = TransactionType.EXPENSE.id,
//                transactionDate = LocalDate.now().minusDays(2),
//                category = TransactionCategory.FOOD.id,
//                description = "Groceries",
//                comment = "Weekly shopping"
//            )
//        )
//        transactionRepository.save(
//            Transaction(
//                account = account1,
//                transactionAmount = 200.0,
//                transactionType = TransactionType.INCOME.id,
//                transactionDate = LocalDate.now().minusDays(1),
//                category = TransactionCategory.SALARY.id,
//                description = "Salary",
//                comment = null
//            )
//        )
//
//        // Create mock transactions for account2
//        transactionRepository.save(
//            Transaction(
//                account = account2,
//                transactionAmount = 50.0,
//                transactionType = TransactionType.EXPENSE.id,
//                transactionDate = LocalDate.now(),
//                category = TransactionCategory.ENTERTAINMENT.id,
//                description = "Movie",
//                comment = "Cinema"
//            )
//        )
//        transactionRepository.save(
//            Transaction(
//                account = account2,
//                transactionAmount = 300.0,
//                transactionType = TransactionType.INCOME.id,
//                transactionDate = LocalDate.now().minusDays(3),
//                category = TransactionCategory.OTHER.id,
//                description = "Gift",
//                comment = "Birthday present"
//            )
//        )
//    }
//}
//package br.com.money.expenses.config
//
//import br.com.money.expenses.enum.TransactionType
//import br.com.money.expenses.model.entity.Account
//import br.com.money.expenses.model.entity.Category
//import br.com.money.expenses.model.entity.Transaction
//import br.com.money.expenses.repository.AccountRepository
//import br.com.money.expenses.repository.CategoryRepository
//import br.com.money.expenses.repository.TransactionRepository
//import org.springframework.boot.CommandLineRunner
//import org.springframework.stereotype.Component
//import java.time.LocalDate
//
//@Component
//class MockDataLoader(
//    private val accountRepository: AccountRepository,
//    private val transactionRepository: TransactionRepository,
//    private val categoryRepository: CategoryRepository
//) : CommandLineRunner {
//    override fun run(vararg args: String?) {
//        // Create mock accounts
//        val account1 = accountRepository.save(Account(name = "Checking", initialBalance = 1000.0))
//        val account2 = accountRepository.save(Account(name = "Savings", initialBalance = 5000.0))
//
//        val categories = listOf(
//            Category(
//                name = "Alimentação",
//                iconKey = "Utensils",
//                color = "red",
//                type = TransactionType.EXPENSE.id,
//                isSystem = true,
//                isActive = true,
//                budgetLimit = null
//            ),
//            Category(
//                name = "Transporte",
//                iconKey = "Car",
//                color = "blue",
//                type = TransactionType.EXPENSE.id,
//                isSystem = true,
//                isActive = true,
//                budgetLimit = null
//            ),
//            Category(
//                name = "Compras",
//                iconKey = "ShoppingBag",
//                color = "purple",
//                type = TransactionType.EXPENSE.id,
//                isSystem = true,
//                isActive = true,
//                budgetLimit = 1500.0
//            ),
//            Category(
//                name = "Casa & Utilidades",
//                iconKey = "Zap",
//                color = "yellow",
//                type = TransactionType.EXPENSE.id,
//                isSystem = true,
//                isActive = true,
//                budgetLimit = null
//            ),
//            Category(
//                name = "Entretenimento",
//                iconKey = "Heart",
//                color = "pink",
//                type = TransactionType.EXPENSE.id,
//                isSystem = true,
//                isActive = true,
//                budgetLimit = null
//            ),
//            Category(
//                name = "Geral - Despesas",
//                iconKey = "Home",
//                color = "purple",
//                type = TransactionType.EXPENSE.id,
//                isSystem = true,
//                isActive = true,
//                budgetLimit = 2000.0
//            ),
//            Category(
//                name = "Geral - Receita",
//                iconKey = "Home",
//                color = "purple",
//                type = TransactionType.INCOME.id,
//                isSystem = true,
//                isActive = true,
//                budgetLimit = null
//            ),
//            Category(
//                name = "Salário",
//                iconKey = "Zap",
//                color = "green",
//                type = TransactionType.INCOME.id,
//                isSystem = true,
//                isActive = true,
//                budgetLimit = null
//            ),
//            Category(
//                name = "Saúde",
//                iconKey = "Heart",
//                color = "red",
//                type = TransactionType.EXPENSE.id,
//                isSystem = true,
//                isActive = true,
//                budgetLimit = 500.0
//            ),
//            Category(
//                name = "Educação",
//                iconKey = "Zap",
//                color = "blue",
//                type = TransactionType.EXPENSE.id,
//                isSystem = true,
//                isActive = true,
//                budgetLimit = null
//            ),
//            Category(
//                name = "Investimentos",
//                iconKey = "Zap",
//                color = "purple",
//                type = TransactionType.INCOME.id,
//                isSystem = true,
//                isActive = true,
//                budgetLimit = null
//            )
//        )
//
//        categoryRepository.saveAll(categories)
//
//        // Create mock transactions for account1
//        transactionRepository.save(
//            Transaction(
//                account = account1,
//                transactionAmount = 100.0,
//                transactionType = TransactionType.EXPENSE.id,
//                transactionDate = LocalDate.now().minusDays(2),
//                category = categories[0],
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
//                category = categories[7],
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
//                category = categories[4],
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
//                category = categories[2],
//                description = "Gift",
//                comment = "Birthday present"
//            )
//        )
//    }
//}
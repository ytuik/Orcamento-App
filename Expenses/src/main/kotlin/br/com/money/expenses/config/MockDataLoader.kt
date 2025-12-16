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
//
//        val accounts = listOf(
//            Account(name = "Checking", initialBalance = 1000.0),
//            Account(name = "Savings", initialBalance = 5000.0)
//        )
//
//        accountRepository.saveAll(accounts)
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
//       categoryRepository.saveAll(categories)
//
//        // Create mock transactions for account1
//
//        val today = LocalDate.now()
//        val transactions = listOf(
//            // Checking account, various categories and types
//            Transaction(account = accounts[0], transactionAmount = 120.0, transactionType = TransactionType.EXPENSE.id, transactionDate = today.minusDays(1), category = categories[0], description = "Supermarket groceries", comment = "Weekly food"),
//            Transaction(account = accounts[0], transactionAmount = 50.0, transactionType = TransactionType.EXPENSE.id, transactionDate = today.minusDays(2), category = categories[1], description = "Bus ticket", comment = "Commute"),
//            Transaction(account = accounts[0], transactionAmount = 300.0, transactionType = TransactionType.EXPENSE.id, transactionDate = today.minusDays(3), category = categories[2], description = "Online shopping", comment = "Electronics"),
//            Transaction(account = accounts[0], transactionAmount = 80.0, transactionType = TransactionType.EXPENSE.id, transactionDate = today.minusDays(4), category = categories[3], description = "Electricity bill", comment = "Utilities"),
//            Transaction(account = accounts[0], transactionAmount = 40.0, transactionType = TransactionType.EXPENSE.id, transactionDate = today.minusDays(5), category = categories[4], description = "Movie night", comment = "Cinema"),
//            Transaction(account = accounts[0], transactionAmount = 2500.0, transactionType = TransactionType.INCOME.id, transactionDate = today.minusDays(6), category = categories[5], description = "Monthly salary", comment = "Salary payment"),
//            Transaction(account = accounts[0], transactionAmount = 500.0, transactionType = TransactionType.INCOME.id, transactionDate = today.minusDays(7), category = categories[6], description = "Investment return", comment = "Stocks"),
//            Transaction(account = accounts[0], transactionAmount = 60.0, transactionType = TransactionType.EXPENSE.id, transactionDate = today.minusDays(8), category = categories[7], description = "Pharmacy", comment = "Medicine"),
//            Transaction(account = accounts[0], transactionAmount = 200.0, transactionType = TransactionType.EXPENSE.id, transactionDate = today.minusDays(9), category = categories[8], description = "Course fee", comment = "Education"),
//            Transaction(account = accounts[0], transactionAmount = 30.0, transactionType = TransactionType.EXPENSE.id, transactionDate = today.minusDays(10), category = categories[9], description = "Miscellaneous", comment = "General expense"),
//
//            // Savings account, mix of income and expenses
//            Transaction(account = accounts[1], transactionAmount = 1000.0, transactionType = TransactionType.INCOME.id, transactionDate = today.minusDays(1), category = categories[6], description = "Investment income", comment = "Dividends"),
//            Transaction(account = accounts[1], transactionAmount = 150.0, transactionType = TransactionType.EXPENSE.id, transactionDate = today.minusDays(2), category = categories[0], description = "Restaurant", comment = "Dinner"),
//            Transaction(account = accounts[1], transactionAmount = 60.0, transactionType = TransactionType.EXPENSE.id, transactionDate = today.minusDays(3), category = categories[1], description = "Taxi", comment = "Airport"),
//            Transaction(account = accounts[1], transactionAmount = 400.0, transactionType = TransactionType.EXPENSE.id, transactionDate = today.minusDays(4), category = categories[2], description = "Clothes shopping", comment = "Summer sale"),
//            Transaction(account = accounts[1], transactionAmount = 90.0, transactionType = TransactionType.EXPENSE.id, transactionDate = today.minusDays(5), category = categories[3], description = "Water bill", comment = "Utilities"),
//            Transaction(account = accounts[1], transactionAmount = 35.0, transactionType = TransactionType.EXPENSE.id, transactionDate = today.minusDays(6), category = categories[4], description = "Concert", comment = "Music event"),
//            Transaction(account = accounts[1], transactionAmount = 2200.0, transactionType = TransactionType.INCOME.id, transactionDate = today.minusDays(7), category = categories[5], description = "Bonus", comment = "Yearly bonus"),
//            Transaction(account = accounts[1], transactionAmount = 70.0, transactionType = TransactionType.EXPENSE.id, transactionDate = today.minusDays(8), category = categories[7], description = "Doctor visit", comment = "Health"),
//            Transaction(account = accounts[1], transactionAmount = 180.0, transactionType = TransactionType.EXPENSE.id, transactionDate = today.minusDays(9), category = categories[8], description = "Book purchase", comment = "Education"),
//            Transaction(account = accounts[1], transactionAmount = 25.0, transactionType = TransactionType.EXPENSE.id, transactionDate = today.minusDays(10), category = categories[9], description = "Stationery", comment = "General expense")
//        )
//
//        transactionRepository.saveAll(transactions)
//    }
//}
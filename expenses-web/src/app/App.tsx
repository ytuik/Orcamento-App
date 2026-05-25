import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MainLayout} from "../components/layout/MainLayout/MainLayout.tsx";
import DashboardPage from "../pages/dashboard/DashboardPage.tsx";
import {TransactionsPage} from "../pages/transactions/TransactionsPage.tsx";
import AccountsPage from "@/pages/accounts/AccountsPage.tsx";
import CategoriesPage from "@/pages/categories/CategoriesPage.tsx";
import {Toaster} from "sonner";

function App() {

  return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/transactions" element={<TransactionsPage/>} />
                    <Route path="/accounts" element={<AccountsPage/>} />
                    <Route path="/categories" element={<CategoriesPage/>} />
                </Route>
            </Routes>
            <Toaster position="bottom-right" theme="dark" />
        </BrowserRouter>
  )
}

export default App

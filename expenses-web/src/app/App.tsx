import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MainLayout} from "../components/layout/MainLayout/MainLayout.tsx";
import DashboardPage from "../pages/dashboard/DashboardPage.tsx";
import {TransactionsPage} from "../pages/transactions/TransactionsPage.tsx";

function App() {

  return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/transactions" element={<TransactionsPage/>} />
                    <Route path="/accounts" element={<div>Página de Contas (Em breve)</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
  )
}

export default App

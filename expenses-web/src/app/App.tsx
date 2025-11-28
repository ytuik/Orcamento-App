import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MainLayout} from "../components/layout/MainLayout/MainLayout.tsx";
import DashboardPage from "../pages/dashboard/DashboardPage.tsx";

function App() {

  return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/transactions" element={<div>Página de Transações (Em breve)</div>} />
                    <Route path="/accounts" element={<div>Página de Contas (Em breve)</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
  )
}

export default App

// Sidebar.tsx (VERSÃO FINAL)
import { NavLink } from "react-router-dom";
import clsx from "clsx";

interface SidebarProps {
    onOpenNewTransaction: () => void;
}

export const Sidebar = ({ onOpenNewTransaction }: SidebarProps) => {
    const navItems = [
        { path: '/', label: 'Dashboard', icon: <i className="bi bi-house-fill" /> },
        { path: '/transactions', label: 'Transações', icon: <i className="bi bi-receipt" /> },
        { path: '/accounts', label: 'Contas', icon: <i className="bi bi-wallet2" /> },
        { path: '/categories', label: 'Categorias', icon: <i className="bi bi-tags-fill" /> },
    ];

    return (
        <aside className="position-fixed top-0 start-0 vh-100 w-sidebar bg-zinc-900 border-f border-zinc-800 z-fixed d-flex flex-column justify-content-between p-3">
            <nav className="nav flex-column gap-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            clsx(
                                "nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 border-transparent transition-all text-zinc-400",
                                "hover-bg-zinc-800 hover-text-zinc-100",
                                isActive && "sidebar-nav-active"
                            )
                        }
                    >
                        <span className="icon-wrapper">{item.icon}</span>
                        <span className="link-text">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
            <div className="mt-auto pt-4 border-top border-zinc-700">
                <button
                    onClick={onOpenNewTransaction}
                    className="w-100 d-flex align-items-center justify-content-center gap-2 py-2 bg-emerald-600 text-white rounded-md fw-semibold btn btn-success"
                >
                    <i className="bi bi-plus" />
                    <span>Nova Transação</span>
                </button>
            </div>
        </aside>
    );
};
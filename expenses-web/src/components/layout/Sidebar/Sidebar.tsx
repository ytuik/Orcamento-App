import {NavLink} from "react-router-dom";
import clsx from "clsx";
import './Sidebar.scss'

interface SidebarProps {
    onOpenNewTransaction: () => void;
}

export const Sidebar = ({ onOpenNewTransaction }: SidebarProps) => {
    const navItems = [
        { path: '/', label: 'Dashboard', icon: <i className={'bi bi-house-fill'} />},
        { path: '/transactions', label: 'Transações', icon: <i className={'bi bi-receipt'} />},
        { path: '/accounts', label: 'Contas', icon: <i className={'bi bi-wallet2'} />},
        { path: '/settings', label: 'Configurações', icon: <i className={'bi bi-gear-fill'} />}
    ];

    return (
        <aside className={"sidebar d-flex flex-column justify-content-between p-3"}>
            <nav className={'nav flex-column gap-2'}>
                {
                    navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                clsx("nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3", {
                                    "active": isActive
                                })
                            }
                        >
                            <span className="icon-wrapper">{item.icon}</span>
                            <span className="link-text">{item.label}</span>
                        </NavLink>
                    ))}
            </nav>
            <div className={'mt-auto pt-4 border-top border-zinc-700'}>
                <button
                    onClick={onOpenNewTransaction}
                    className="btn-new-transaction w-100 d-flex align-items-center justify-content-center gap-2 py-2"
                >
                    <i className={'bi bi-plus'}/>
                    <span className="fw-semibold">Nova Transação</span>
                </button>
            </div>
        </aside>
    )
}
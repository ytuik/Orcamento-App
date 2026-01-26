import {Pencil, Plus, Trash2} from "lucide-react";
import {useAccounts} from "@/hooks/useAccounts.ts";
import {AccountCard} from "@/components/accounts/AccountCard/AccountCard.tsx";

function AccountsPage() {
    const accounts = useAccounts().allAccounts
  return (
      <div className="accounts-container container min-vh-100 bg-zinc-950 text-zinc-100 p-6 p-lg-8">
          <div className="header-section mb-5 d-flex flex-row justify-content-between align-items-center">
              <div>
                  <h1 className="fw-bold text-zinc-100 mb-2">Minhas Contas</h1>
                  <p className="text-zinc-500 fs-6"> Gerenciando minhas carteiras e bancos</p>
              </div>
              <div>
                    <button className="btn btn-primary rounded-md px-3 py-2 fs-5 fw-semibold d-flex align-items-center gap-2">
                        <Plus />
                        Adicionar Conta
                    </button>
              </div>
          </div>

          <div className="accounts-list container" >
              <div className="row row-gap-4">
                {accounts.length > 0 ? (
                  accounts.map(acc =>  (
                      <div className="col-xl">
                        <AccountCard
                            key={acc.id}
                            name={acc.name}
                            color={acc.color}
                            balance={acc.currentBalance}
                            className={"w-100"}
                        >
                            <div className={'mt-2 border-f-t border-zinc-700 d-flex flex-row gap-2 pt-4 justify-content-around'}>
                                <button className={"align-items-center justify-content-center btn btn-sm btn-outline-purple d-flex flex-row gap-2 w-75 fw-semibold fs-5"} >
                                    <Pencil />
                                    Editar
                                </button>
                                <button className="btn btn-outline-danger">
                                    <Trash2/>
                                </button>
                            </div>
                        </AccountCard>
                      </div>
                      ))
                ) : (
                    <div className="text-white-50 p-3 border border-dashed rounded-lg">
                        Nenhuma conta cadastrada.
                    </div>
                )}
              </div>
          </div>

      </div>
  )
}

export default AccountsPage;
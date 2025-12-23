import type { AccountDto } from "../../../../types/accountDto";
import { AccountCard } from "../AccountCard.tsx";

interface AccountsCarouselProps {
    accounts: AccountDto[];
}

export const AccountsCarousel = ({ accounts }: AccountsCarouselProps) => {
    return (
        <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="text-white fw-bold mb-0">Minhas Contas</h5>
            </div>

            <div className="carousel-horizontal d-flex align-items-center pb-3">
                {accounts.length > 0 ? (
                    accounts.map(acc => (
                        <AccountCard
                            key={acc.id}
                            name={acc.name}
                            balance={acc.currentBalance}
                            className="me-3 scroll-snap-start"
                        />
                    ))
                ) : (
                    <div className="text-white-50 p-3 border border-dashed rounded-lg">
                        Nenhuma conta cadastrada.
                    </div>
                )}

                <AccountCard
                    name="Adicione uma conta"
                    balance={0}
                    className="me-3 scroll-snap-start"
                    onClick={() => console.log('Adicionar Conta')}
                />
            </div>
        </div>
    );
};
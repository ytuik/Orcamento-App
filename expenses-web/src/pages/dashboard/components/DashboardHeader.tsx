import {format} from 'date-fns'
import {ptBR} from "date-fns/locale";
import {capitalizeFirstLetter} from "../../../utils/stringUtils.ts";
export const DashboardHeader = () => {
    const dateNow = new Date
    return (
        <div
            className={"d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center"}>
            <div className={"mb-3 mb-md-0"}>
                <h1 className={"text-white fw-bold"}>
                    Dashboard
                </h1>
                <p className={"text-white-50"}>{capitalizeFirstLetter(format(dateNow, "MMMM y", {locale:ptBR, }))}</p>
            </div>
        </div>
    )
}
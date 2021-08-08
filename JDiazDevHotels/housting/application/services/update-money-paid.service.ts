import { Service } from "typedi";

import { HoustingPersistenceAdapter } from "../../infraestructure/out/persistence/housting-persistence.adapter";
import { GetHoustingPort } from "../ports/out/self-domain/get-housting.port";
import { UpdateMoneyPaidUseCase } from './../ports/in/update-money-paid-use-case';
import { UpdateMoneyPaidPort } from './../ports/out/self-domain/update-money-paid.port';

@Service()
export class UpdateMoneyPaidService implements UpdateMoneyPaidUseCase {
    private getHoustingPort: GetHoustingPort
    private updateMoneyPaidPort: UpdateMoneyPaidPort


    constructor(
        houstingPersistenceAdapter: HoustingPersistenceAdapter
    ) {
        this.getHoustingPort = houstingPersistenceAdapter
        this.updateMoneyPaidPort = houstingPersistenceAdapter
    }
    async updateMoneyPaid(houstingId: number, moneyToAdd: number): Promise<any> {
        const getHoustingPort = await this.getHoustingPort.getHousting(houstingId)

        //bussines logic
        let newMoney: number = getHoustingPort.moneyPaid + moneyToAdd

        const moneyUpdated = await this.updateMoneyPaidPort.updateMoneyPaid(houstingId, newMoney)
        return moneyUpdated
    }
}
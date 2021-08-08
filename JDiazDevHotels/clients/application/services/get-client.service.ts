import { Service } from "typedi";
import { ClientCommand } from "../ports/in/client.command";
import { GetClientModeledPort } from "../ports/out/self-domain/get-client-modeled.port";
import { GetClientPort } from "../ports/out/self-domain/get-client-port";
import { GetClientRequest } from './../ports/in/get-client.request';
import { ClientPersistenceAdapter } from '../../infraestructure/out/persistence/client-persistence-adapter';
import { ClientDomainEntity } from "../../domain/clients";
import { GetClientForHoustingDomain } from "../../../housting/application/ports/out/other-domain/get-client-for-housting-domain";

@Service()
export class GetClientService implements
    GetClientRequest,
    GetClientForHoustingDomain {
    private getClientModeledPort: GetClientModeledPort
    private getClientPort: GetClientPort

    constructor(clientPersistenceAdapter: ClientPersistenceAdapter) {
        this.getClientModeledPort = clientPersistenceAdapter
        this.getClientPort = clientPersistenceAdapter
    }
    async getTheClient(clientId: number, command: ClientCommand): Promise<any> {
        const clientModeled: ClientDomainEntity = await this.getClientModeledPort.getClientModeled(clientId)

        if (!clientModeled.checkIfClientBelongsToHotel(command.getHotelId)) {
            return { message: 'You cannot get this client' }
        }

        const client = await this.getClientPort.getClient(clientId)
        return client
    }
    async getClientForHoustingDomain(clientId: number): Promise<any> {
        const client = await this.getClientPort.getClient(clientId)
        return client
    }
}
import { Service } from "typedi";
import { DataClient } from "../../../application/services/data-client";
import { ClientDatabaseEntity } from "./client-database-entity";
import { ClientRepository } from "./client-repository";

@Service()
export class ClientORM implements ClientRepository {
    async createClient(hotelId: number, dataClient: DataClient): Promise<any> {
        try {
            const client: ClientDatabaseEntity = new ClientDatabaseEntity()
            client.names = dataClient.names
            client.surnames = dataClient.surnames
            client.dni = dataClient.dni
            client.cellphone = dataClient.cellphone
            client.visitReason = dataClient.visitReason
            client.hotelId = hotelId
            await client.save()

            return client
        } catch (error) {
            console.log('------------', error)
        }
    }
    async getClient(clientId: number): Promise<any> {
        try {
            const client = await ClientDatabaseEntity.findByPk(clientId)
            return client
        } catch (error) {
            console.log('------------', error)
        }
    }
    async getClients(hotelId:number):Promise<any>{
        try {
            const clients = await ClientDatabaseEntity.findAll(
                {where:{hotelId:hotelId}}
            )
            return clients
        } catch (error) {
            console.log('------------', error)
        }
    }
    async updateClient(clientId: number, dataClient: DataClient): Promise<any> {
        try {
            const client: any = await ClientDatabaseEntity.findByPk(clientId)
            client.names = dataClient.names
            client.surnames = dataClient.surnames
            client.dni = dataClient.dni
            client.cellphone = dataClient.cellphone
            client.visitReason = dataClient.visitReason
            await client.save()
            
            return client
        } catch (error) {
            console.log('------------', error)
        }
    }
}
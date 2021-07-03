import { Service } from "typedi";
import { CreateClientPort } from "../../../application/ports/out/self-domain/create-client.port";
import { ClientRepository } from './client-repository';
import { ClientORM } from './client-orm';
import { DataClient } from "../../../application/services/data-client";
import { UpdateClientPort } from "../../../application/ports/out/self-domain/update-client.port";
import { GetClientModeledPort } from "../../../application/ports/out/self-domain/get-client-modeled.port";
import { ClientDomainEntity } from "../../../domain/clients";
import { GetClientPort } from "../../../application/ports/out/self-domain/get-client-port";
import { GetClientsPort } from './../../../application/ports/out/self-domain/get-clients.port';


@Service()
export class ClientPersistenceAdapter implements 
    CreateClientPort,
    UpdateClientPort, 
    GetClientModeledPort,
    GetClientPort,
    GetClientsPort {
    private clientRepository:ClientRepository

    constructor( clientORM:ClientORM ){
        this.clientRepository = clientORM
    }
    async createClient(hotelId:number, dataClient:DataClient):Promise<any>{
        const client = await this.clientRepository.createClient(hotelId, dataClient)
        return client
    }
    async updateClient(clientId:number, dataClient:DataClient):Promise<any>{
        const client = await this.clientRepository.updateClient(clientId, dataClient)
        return client
    }
    async getClientModeled(clientId:number):Promise<any>{
        const client = await this.clientRepository.getClient(clientId)
        return new ClientDomainEntity(client.hotelId)
    }
    async getClient(clientId:number):Promise<any>{
        const client = await this.clientRepository.getClient(clientId)
        return client
    }   
    async getClients(hotelId:number):Promise<any>{
        const clients = await this.clientRepository.getClients(hotelId)
        return clients
    }
}




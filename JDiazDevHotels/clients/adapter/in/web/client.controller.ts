import { Service } from "typedi";
import { Request, Response } from 'express'

import { CreateNewClientRequest } from './../../../application/ports/in/create-new-client-request';
import { CreateClientService } from './../../../application/services/create-client.service';
import { DataClient } from "../../../application/services/data-client";
import { UpdateClientRequest } from "../../../application/ports/in/update-client.request";
import { UpdateClientService } from "../../../application/services/update-client.service";
import { GetClientRequest } from "../../../application/ports/in/get-client.request";
import { GetClientService } from './../../../application/services/get-client.service';
import { ClientCommand } from './../../../application/ports/in/client.command';
import { GetClientsRequest } from "../../../application/ports/in/get-clients.request";
import { GetClientsService } from "../../../application/services/get-clients.port.service";

@Service()
export class ClientController {
    private createNewClientRequest:CreateNewClientRequest
    private updateClientRequest:UpdateClientRequest
    private getClientRequest:GetClientRequest
    private getClientsRequest:GetClientsRequest
    
    constructor(
        createClientService:CreateClientService,
        updateClientService:UpdateClientService,
        getClientService:GetClientService,
        getClientsService:GetClientsService
    ) {
        this.createNewClientRequest = createClientService
        this.updateClientRequest = updateClientService 
        this.getClientRequest = getClientService
        this.getClientsRequest = getClientsService
    }

    createClient = async (req:Request|any, res:Response) => {
        const { names, surnames, dni, cellphone, visitReason } = req.body
        const { hotelId } = req.params

        const dataClient = new DataClient(names, surnames, dni, parseInt(cellphone), visitReason)
        const newClient = await this.createNewClientRequest.createNewClient(parseInt(hotelId), dataClient)

        res.json(newClient)
    }
    getClient = async (req:Request|any, res:Response) => {
        const { hotelId, clientId } = req.params

        const client = await this.getClientRequest.getTheClient(clientId, new ClientCommand( parseInt(hotelId)))

        res.json(client)
    }
    getClients = async (req:Request|any, res:Response) => {
        const { hotelId } = req.params

        const client = await this.getClientsRequest.getTheClients(parseInt(hotelId))
        res.json(client)
    }
    updateClient = async (req:Request|any, res:Response) => {
        const { names, surnames, dni, cellphone, visitReason } = req.body
        const { hotelId, clientId } = req.params

        const dataClient = new DataClient(names, surnames, dni, parseInt(cellphone), visitReason)
        const clientUpdated = await this.updateClientRequest.updateTheClient(
            parseInt(clientId), 
            new ClientCommand( parseInt(hotelId)), 
            dataClient
        )

        res.json(clientUpdated)
    }


}
import { Service } from 'typedi'
import { Request, Response } from 'express'

import { CreateNewHotelRequest } from '../../../../application/port/in/hotel/create-new-hotel.request';
import { CreateHotelCommand } from '../../../../application/port/in/hotel/create-hotel.command';
import { CreateHotelService } from '../../../../application/service/hotel/create-hotel.service';
import { HotelEntity } from '../../../../domain/hotel';


@Service()
export class HotelController {
    private createNewHotelRequest:CreateNewHotelRequest

    constructor(createHotelService:CreateHotelService){
        this.createNewHotelRequest = createHotelService
    }
    createHotel = async (req:Request|any, res:Response) => {
        const { name, address } = req.body
        const { clientId } = req.params 
        const { id } = req.user

        const command = new CreateHotelCommand(
            new HotelEntity(name, address))
        const hotelCreated = await this.createNewHotelRequest.createNewHotel(command, parseInt(clientId), parseInt(id))

        res.json(hotelCreated)
    }
} 




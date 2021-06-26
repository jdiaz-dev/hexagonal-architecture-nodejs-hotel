import { Service } from 'typedi'
import { Request, Response } from 'express'

import { CreateNewHotelUseCase } from '../../../application/port/in/create-new-hotel.use-case';
import { CreateHotelCommand } from '../../../application/port/in/create-hotel.command';
import { CreateHotelService } from '../../../application/service/create-hotel.service';
import { HotelEntity } from '../../../domain/hotel';


@Service()
export class HotelController {
    private createNewHotelUseCase:CreateNewHotelUseCase

    constructor(createHotelService:CreateHotelService){
        this.createNewHotelUseCase = createHotelService
    }
    createHotel = async (req:Request, res:Response) => {
        const { name, address } = req.body

        const command = new CreateHotelCommand(
            new HotelEntity(name, address))
        const hotelCreated = await this.createNewHotelUseCase.createNewHotel(command)

        res.json(hotelCreated)
    }
} 




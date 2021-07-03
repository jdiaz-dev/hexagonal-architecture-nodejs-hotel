import { Request, Response, NextFunction} from 'express'
import { Service } from 'typedi'
import { verify } from 'jsonwebtoken'

import { CommonNeedUserFromUserBcontextPort } from '../ports/out/common-need-user-from-user-bcontext.port';
import { GetUserService } from '../../users/application/service/users/get-user.service';
import { CommonNeedHotelFromHotelBcontextPort } from './../ports/out/common-need-hotel-from-hotel-bcontext.port';
import { GetHotelService } from '../../hotel/hotels/application/services/get-hotel.service';

@Service()
export class CommonMiddlwares {
    private commonNeedUserFromUserBcontextPort:CommonNeedUserFromUserBcontextPort
    private commonNeedHotelFromHotelBcontextPort:CommonNeedHotelFromHotelBcontextPort

    constructor(
        getUserService:GetUserService,
        getHotelService:GetHotelService
    ){
        this.commonNeedUserFromUserBcontextPort = getUserService
        this.commonNeedHotelFromHotelBcontextPort = getHotelService

        this.validateJWT = this.validateJWT.bind(this)
    }

    validateJWT = async (req:Request|any, res:Response, next:NextFunction) => {
        const token = req.header('jdevhotel-token') 

        if(!token){
            return res.status(400).json({
                msg:'There is not a token in the request'
            })
        }

        //validate token
        try {
            
            const payload:any = verify(token, process.env.SECRETORPRIVATEKEY || 'jdevhotels')
            const user = await this.commonNeedUserFromUserBcontextPort.getUser(payload.id)
    
            if(!user){
                return res.status(401).json({ //401 : to authorized to make a specific action
                    msg:'It token is not valid - user does not exist in DB'
                })
            }
    
            if(!user.state){
                return res.status(401).json({
                    msg:'It token is not valid - user with state:false'
                })
            }
            //req.uid = uid //adiing uid to request
            req.user = user
            
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                msg:'Token is not valid'
            })
        }

        next()
    }
    checkIfHotelBelongsToClientApp = async (req:Request|any, res:Response, next:NextFunction) => {
        const { id } = req.user
        const { hotelId } = req.params

        const user = await this.commonNeedUserFromUserBcontextPort.getUser(id)
        const hotel = await this.commonNeedHotelFromHotelBcontextPort.getHotel(hotelId)

        if(user.id !== hotel.user.id){
            return res.status(400).json({
                msg:'You cannot make operations'
            })
        }
        next()
    }
}
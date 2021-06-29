import { Request, Response, NextFunction} from 'express'
import { Service } from 'typedi'
import { verify } from 'jsonwebtoken'

import { CommonNeedUserFromUserBcontextPort } from '../ports/out/common-need-user-from-user-bcontext.port';
import { GetUserService } from '../../user/application/service/users/get-user.service';

@Service()
export class TokenHelper {
    private commonNeedUserFromUserBcontextPort:CommonNeedUserFromUserBcontextPort

    constructor(getUserService:GetUserService){
        this.commonNeedUserFromUserBcontextPort = getUserService

        this.validateJWT = this.validateJWT.bind(this)
    }

    async validateJWT (req:Request|any, res:Response, next:NextFunction)  {
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
}
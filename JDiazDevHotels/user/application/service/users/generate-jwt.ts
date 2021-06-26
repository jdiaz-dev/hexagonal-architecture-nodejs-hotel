import jwt from 'jsonwebtoken'

//const jwt = require('jsonwebtoken')

export const generateJWT = (user:object|any) => { //uid : user identifier
    return new Promise((resolve, reject) => {

        //the "uid" is the only thing that will be added in the payload
        const payload = { id:user.id, names:user.names }

            // to sign a token
        jwt.sign( payload, (process.env.SECRETORPRIVATEKEY || 'jdevhotels') as string, {
            expiresIn:'1d' // to expire in 1 day
        }, (err, token) => { //callback
            if(err){
                console.log(err)
                reject('It was impossible to generate the token')
            }else{
                resolve(token)
            }
        }) 
    })
} 




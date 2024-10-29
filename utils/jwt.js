import jwt from 'jsonwebtoken'

export const generateTOken = (userId) =>{
    return jwt.sign({_id:userId},process.env.SECRET_KEY,{expiresIn:'1h'})}
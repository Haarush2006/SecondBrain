import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_USER_SECRET } from "./config";


export const userMiddleware = (req:Request, res:Response, next:NextFunction)=>{
    const Token = req.headers.authorization

    if(!Token){
         res.status(403).json({message: "Token missing"})
    }
    else{
        try {
        const decode = jwt.verify(Token,JWT_USER_SECRET) 
            if(decode){
                //@ts-ignore
                req.UserId = decode.id 
                next()
            }
        } 
        
        catch (e) {
            res.status(403).json({
                message: "Invalid Token"
            })
        }
    }
}

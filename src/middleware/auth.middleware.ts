import { Request, Response, NextFunction } from "express";
import { getUserData, IUserToken } from "../utils/jwt";

export interface IRequestWithUser extends Request{
    user?: IUserToken
}  

export default(req: Request, res: Response, next: NextFunction) => {
    const authorization  = req.headers?.authorization;

    if(!authorization){
        res.status(403).json({
            message: "unauthorized",
            data: null
        })
        return
    }

    const[prefix, token] = authorization.split(" ");

    if(!(prefix === "Bearer" && token)){
        res.status(403).json({
            message: "unauthorized",
            data: null
        })
        return
    }

    const user = getUserData(token);

    if(!user){
        res.status(403).json({
            message: "unauthorized",
            data: null
        })
        return
    }

    (req as IRequestWithUser).user = user;

    next();

}
import authService from "../services/auth.service";
import { Request, Response } from "express";
import { register } from "ts-node";
import * as Yup from "yup";
import { IRequestWithUser } from "../middleware/auth.middleware";
import UserModel, { User } from "../models/user.model";
import { ObjectId } from "mongoose";

const registrationSchema = Yup.object().shape({
    fullName: Yup.string().required(),
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), ""],
        "password must match "
    ),
    roles: Yup.array().of(Yup.string()).optional()
})

const loginSchema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required(),
})

type TloginBody = Yup.InferType<typeof loginSchema>;
type TRegisterBody = Yup.InferType<typeof registrationSchema>;

interface IRequestLogin extends Request{
    body: TloginBody
}

interface IRequestRegister extends Request{
    body: TRegisterBody
}


export default{
    async login(req: IRequestLogin, res: Response){
            /**
                 #swagger.tags = ['Auth']
                    #swagger.requestBody = {
                    required: true,
                    schema: {
                        $ref: "#/components/schemas/LoginRequest"
                    }
                    }
            */
        try {
            const {email, password} = req.body;
            await loginSchema.validate({email,password});
            const token = await authService.login({email,password});
            res.status(200).json({
                data: token,
                message: "login success"
            })
        } catch (error) {
            const err = error as unknown as Error
            res.status(500).json({
                data: null,
                message: err.message
            })
        }
    },
    async register(req: IRequestRegister, res: Response){
        /**
            #swagger.tags = ['Auth']
            #swagger.requestBody = {
                required: true,
                schema: {
                    $ref: "#/components/schemas/RegisterRequest"
                }
            }
        */
        try {
            const {fullName, username, email, password,confirmPassword, roles} = req.body
            await registrationSchema.validate({
                fullName,
                username,
                email,
                password,
                confirmPassword,
                roles
            })

            const result = await authService.register({
                fullName,
                username,
                email,
                password,
                roles
            })

            res.status(200).json({
                data: result,
                message: 'registration success ...'
            })
        } catch (error) {
            const err = error as unknown as Error;
            res.status(500).json({
                data: null,
                message: err.message
            })
        }
    },
    async myProfile(req: IRequestWithUser, res: Response ){
        /**
             #swagger.tags = ['Auth']
            #swagger.security = [{
            "bearerAuth": []
            }]
        */
        try {
            const id = req.user?.id
            const result = await UserModel.findById(id)
            if(!result){
                res.status(403).json({
                    data: null,
                    message: 'user not found'
                })
            }
            res.status(200).json({
                data: result,
                message: 'success to get user'
            })
        } catch (error) {
            const err = error as unknown as Error
            res.status(403).json({
                message: 'failed to get data',
                data: null
            })
        }
    },
    async updateProfile(req: IRequestWithUser, res: Response){

        /**
        #swagger.tags = ['Auth']
        #swagger.requestBody = {
            required: true,
            schema: {$ref: "#/components/schemas/UpdateProfileRequest"}
            }
        #swagger.security = [{
            "bearerAuth": []
            }]
         */

        try {
            const id = req.user?.id;
            const result = await authService.updateProfile(
                id as unknown as ObjectId,
                req.body as User
            )
            res.status(200).json({
                message: 'profile update success',
                data: result
            })
        } catch (error) {
            res.status(500).json({
                message: 'failed to update profile',
                data: null
            })            
        }
    },
    async deleteUser(req: IRequestWithUser, res: Response){
        /**
             #swagger.tags = ['Auth']
            #swagger.security = [{
            "bearerAuth": []
            }]
        */
        try {
            const id = req.user?.id;
            const result = await authService.deleteUser(id as unknown as ObjectId);
            res.status(200).json({
                message: `success to delete user ${id}`,
                data: result
            })
        } catch (error) {
            res.status(501).json({
                message: `failed to delete user`,
                data: null
            })        
        }
    }
}
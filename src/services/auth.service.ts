import { Response } from "express";
import { ObjectId } from "mongoose";
import UserModel, {User} from "../models/user.model";
import { encrypt } from "../utils/encryption";
import { generateToken } from "../utils/jwt";

export interface ILoginPayload{
    email: string,
    password: string
}

export interface IRegisterPayload{
    email: string,
    fullName: string,
    username: string,
    password: string,
    roles: (string | undefined)[] | undefined
}

export const login = async(payload: ILoginPayload): Promise<string> => {
    const {email , password} =  payload
    const userByEmail = await UserModel.findOne({email});
    
    if(!userByEmail){
        return Promise.reject(new Error("email not found"))
    }
    
    const validatePassword: boolean = encrypt(password) === userByEmail.password;
    
    if(!validatePassword){
        return Promise.reject(new Error("failed login,password not match"))
    }
    
    const token = generateToken({
        id: userByEmail._id,
        roles: userByEmail.roles
    })
    
    return token
}

export const register = async(payload: IRegisterPayload): Promise<User> => {
    const {username, fullName, password, email,roles} = payload;
    
    const user = await UserModel.create({
        email,
        fullName,
        password,
        username,
        roles,
    })
    return user
}

export const me = async(userId: string): Promise<User> => {
    const result = await UserModel.findById(userId);
    if (!result) {
        return Promise.reject(new Error("user not found"))
    }
    return result
}

export const updateProfile = async(userId: ObjectId, updateUserData: User): Promise<User> => {
    const result = await UserModel.findByIdAndUpdate(
        userId,
        {...updateUserData},
        {new : true}
    )
    
    if(!result){
        return Promise.reject(new Error("failed to update user data"))
    }
    return result

}

export const deleteUser = async(userId: ObjectId): Promise<User> => {
    const result = await UserModel.findByIdAndDelete(userId);
    
    if(!result){
        return Promise.reject(new Error("failed to delete user, user not found"))
    }
    return result
}


export default {login, register, me, updateProfile, deleteUser}
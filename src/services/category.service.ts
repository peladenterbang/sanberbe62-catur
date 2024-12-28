import { ObjectId } from "mongoose"
import { Response } from "express"
import CategoryModel from "../models/category.model"

export interface ICategoryPayload {
    categoryName: string,
}


export const createCategory = async(req: ICategoryPayload) => {
    const {categoryName} = req
    const result = await CategoryModel.create(req);
    if(!result){
        Promise.reject(new Error("failed to create category"))
    }
    return result
}

export const deleteCategory = async(req: ObjectId) => {
    const result = await CategoryModel.findByIdAndDelete(req)
    if(!result){
        Promise.reject(new Error("failed to delete category"))
    }
    return result
}

export const getCategories = async() => {
    const result = await CategoryModel.find()
    if(!result){
        Promise.reject(new Error("failed to get all category"))
    }
    return result
}

export default {createCategory, deleteCategory, getCategories}
import { Response } from "express"
import { ObjectId } from "mongoose"
import ProductModel, { Product } from "../models/products.model";




export const createProduct = async(data: Product) => {
    const result = await ProductModel.create(data);
    return result
}

export const getProducts = async(query: any, options: { limit: number; skip: number }) => {
    const result = await ProductModel.find(query)
            .limit(options.limit)
            .skip(options.skip)
            .exec();
    if(!result){
        Promise.reject(new Error("failed to get all product"));
    }
    return result
}

export const getProductByID = async(productId: string) => {
    console.log(productId)
    const result = await ProductModel.findOne({_id: productId});
    console.log(result)
    if(!result){
        Promise.reject(new Error("failed to get product product"));
    }
    return result
}
export const updateProduct = async(productId: ObjectId, productData: Product) => {
    const result = await ProductModel.findByIdAndUpdate(
        productId,
        {
            ...productData
        },
        {
            new: true
        }
    )
    if(!result){
        Promise.reject(new Error("failed to update product"))
    }
    return result
}

export const deleteProduct = async(productId: ObjectId) => {
    const result = await ProductModel.findByIdAndDelete(productId);
    if(!result){
        Promise.reject(new Error("failed to delete product"))
    }
    return result
}

export const updateProductQty = async(productId: Object | string, qty: number) =>  {
    await ProductModel.findByIdAndUpdate(
         productId,
        { qty, updatedAt: new Date().toISOString() },
        { new: true }
    );
}

export default {createProduct, getProducts,getProductByID, updateProduct, deleteProduct}
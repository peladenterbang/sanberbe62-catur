import { ObjectId } from "mongoose"
import OrderDetailModel from "../models/orderDetail.model"


export interface IorderDetail{
    productId: string[],
    qty: number,
    subTotal: number,
    order: string
}


export const create = async(payload: IorderDetail) => {
    const {productId, qty ,subTotal,order} = payload
    const result = await OrderDetailModel.create({
        productId, 
        qty ,
        subTotal,
        order
    })
    return result
}

export const getMyDetailOrder = async(orderDetailId: ObjectId) => {
    const result = await OrderDetailModel.findById(orderDetailId)
    return result
}

export const update = async(orderDetailId: ObjectId, payload: IorderDetail) => {
    const result = await OrderDetailModel.findByIdAndUpdate(
        {orderDetailId},
        {...payload},
        {new: true}
    )
    return result
}

export const remove = async(orderDetailId: ObjectId) => {
    const result = await OrderDetailModel.findByIdAndDelete(orderDetailId)
    return result
}

export default {create, getMyDetailOrder, update, remove}
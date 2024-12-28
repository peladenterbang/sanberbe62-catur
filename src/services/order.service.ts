import mongoose, { ObjectId } from "mongoose"
import OrderModel from "../models/orders.model"

export interface IOrderItem {
    name: string;
    productId: mongoose.Types.ObjectId;
    price: number;
    quantity: number;
  }

export interface Iorder extends Document{
    grandTotal: number,
    orderItems: [IOrderItem],
    status: 'pending' | 'completed' | 'cancelled',
    createdBy: mongoose.Types.ObjectId
}




export const create = async(userId: string ,payload: Iorder) => {
    const {grandTotal, orderItems, status} = payload 
    const createdBy = userId
    const result = await OrderModel.create({
        grandTotal,
        orderItems,
        status,
        createdBy
    })
    return result  
}

export const update = async(userId: ObjectId,payload: Iorder) => {
    const id = userId
    const result = await OrderModel.findByIdAndUpdate(
        id,
        {...payload},
        {new: true}
    )
    return result
}

export const getMyOrder = async(userId: string) => {
    const result = await OrderModel.find({ createdBy: userId })
    return result
}

export const remove = async(orderId: string) => {
    const result = await OrderModel.findByIdAndDelete(orderId)
    return result
}

export default {
    create,
    update,
    getMyOrder,
    remove
}
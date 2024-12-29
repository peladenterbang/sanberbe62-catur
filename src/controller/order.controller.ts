import mongoose from "mongoose";
import { Request, Response } from "express";
import * as Yup from "yup";
import orderService, { getMyOrder } from "../services/order.service";
import { IRequestWithUser } from "../middleware/auth.middleware";
import { getProductByID, updateProductQty } from "../services/product.service";

interface getUserId {
    userId: string
}

interface Product {
    productName: string;
    description: string;
    price: number;
    qty: number;
    categoryId: mongoose.Types.ObjectId | null;
    createdAt: string;
    updatedAt: string;
}

const YOrderItemSchema = Yup.object().shape({
    name: Yup.string().required(),
    productId : Yup.string().required(),
    price: Yup.number().required(),
    quantity : Yup.number().required()
})

const YOrderSchema = Yup.object().shape({
    grandTotal: Yup.number().required(),
    orderItems: Yup.array().of(YOrderItemSchema).min(1).max(5).required(),
    status: Yup.string().required(),
    createdBy: Yup.string()
})

export default{
    async create(req: IRequestWithUser, res: Response){
        /**
        #swagger.tags = ['Order']
        #swagger.security = [{
        "bearerAuth": []
        }]
        }
        #swagger.requestBody = {
                    required: true,
                    schema: {
                        $ref: "#/components/schemas/CreateOrderRequest"
                    }
                    }
        */
        try {
            const {grandTotal, orderItems, status} = req.body
            const createdBy = String(req.user?.id);
            await YOrderSchema.validate({
                grandTotal,
                orderItems,
                status
            })

            if (!Array.isArray(orderItems) || orderItems.length === 0) {
                res.status(400).json({ message: 'orderItems must be a no empty' });
            }

            for (const item of orderItems) {
                console.log(item.productId)
                const getProduct  = await getProductByID(item.productId)
                console.log(getProduct)
                if(!getProduct){
                    res.status(500).json({
                        message: 'product not found',
                        data: null
                    })
                    return;
                }
                if(getProduct?.qty === undefined ||getProduct?.qty <= 0){
                    res.status(500).json({
                        message: 'product not available',
                        data: null
                    })
                    return;
                }
                if(getProduct?.qty === undefined || item.quantity > getProduct?.qty){
                    res.status(500).json({
                        message: 'insuficcient qty input',
                        data: null
                    })
                    return;
                }
                const updateQty = getProduct?.qty! - item.quantity
                await updateProductQty(item.productId, updateQty);
            }

            const result = await orderService.create(createdBy,req.body)
            res.status(200).json({
                message: 'success to create order',
                data: result
            })

        } catch (error) {
            const err = error as unknown as Error
            res.status(500).json({
                message:'failed to create order',
                data: err
            })
        }
    },
    async update(req: IRequestWithUser, res: Response){
        /**
        #swagger.tags = ['Order']
        #swagger.security = [{
        "bearerAuth": []
        }]
        }
        */
        try {
            const id = req.body._id 
            const createdBy = req.user?.id
            
            const {grandTotal, orderItems, status} = req.body
            await YOrderSchema.validate({
                grandTotal,
                orderItems,
                status,
                createdBy
            })
            const result = await orderService.update(id,req.body)
            res.status(200).json({
                message: 'success to update order',
                data: result
            })

        } catch (error) {
            const err = error as unknown as Error
            res.status(500).json({
                message:'failed to update order',
                data: err
            })
        }
    },
    async getMyOrder(req: IRequestWithUser, res: Response){
        /**
        #swagger.tags = ['Order']
        #swagger.security = [{
        "bearerAuth": []
        }]
        }
        */
        try {
            const id = String(req.user?.id)
            const result = await orderService.getMyOrder(id)
            res.status(200).json({
                message: `success to get order`,
                data: result
            })
        } catch (error) {
            const err = error as unknown as Error
            res.status(500).json({
                message:'failed to get my order',
                data: err
            })
        }
    },
    async remove(req: Request, res: Response){
        /**
        #swagger.tags = ['Order']
        #swagger.security = [{
        "bearerAuth": []
        }]
        }
        */
        try {
            const id = req.body._id 
            const result = await orderService.remove(id)
            res.status(200).json({
                message: `success to remove order`,
                data: result
            })
        } catch (error) {
            const err = error as unknown as Error
            res.status(500).json({
                message:'failed to delete my order',
                data: err
            })
        }
    }
}
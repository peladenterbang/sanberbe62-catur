import * as Yup from "yup";
import { Request,Response } from "express";
import orderDetailService from "../services/orderDetail.service";



const YOrderDetail = Yup.object().shape({
    productId: Yup.array().required(),
    qty: Yup.number().required(),
    subTotal: Yup.number().required(),
    order: Yup.string().required()
})

export default{
    async create(req: Request, res: Response) {
        try {
            const {productId, qty, subTotal, order} = req.body
            await YOrderDetail.validate({
                productId,
                qty,
                subTotal,
                order
            })
            const result = await orderDetailService.create(req.body)
            res.status(200).json({
                message: 'success to create detail order',
                data: result
            })
        } catch (error) {
            const err = error as unknown as Error
            res.status(501).json({
                message: 'failed to create detail order',
                data: err.message
            })
        }
    },
    async update(req: Request, res: Response) {
        try {
            const id = req.body._id
            const {productId, qty, subTotal, order} = req.body
            await YOrderDetail.validate({
                productId,
                qty,
                subTotal,
                order
            })

            const result = await orderDetailService.update(id,req.body)
            res.status(200).json({
                message: `success to update order detail`,
                data: result
            })
        } catch (error) {
            const err = error as unknown as Error
            res.status(501).json({
                message: 'failed to update detail order',
                data: err.message
            })
        }
    },
    async getMyOrderDetail(req: Request, res: Response) {
        try {
            const id = req.body._id
            const result = await orderDetailService.getMyDetailOrder(id)
            res.status(200).json({
                message: `success to get my order detail`,
                data: result
            })
        } catch (error) {
            const err = error as unknown as Error
            res.status(501).json({
                message: 'failed to get my detail order',
                data: err.message
            })
        }
    },
    async remove(req: Request, res: Response) {
        try {
            const id = req.body._id
            const result = await orderDetailService.remove(id)
            res.status(200).json({
                message: `success to delete my order detail`,
                data: result
            })
        } catch (error) {
            const err = error as unknown as Error
            res.status(501).json({
                message: 'failed to delete my detail order',
                data: err.message
            })
        }
    }
}
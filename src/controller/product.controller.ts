import * as Yup from "yup";
import { Request, Response } from "express";
import productService, { deleteProduct, getProducts } from "../services/product.service";
import ProductModel from "../models/products.model";

const YproductSchema = Yup.object().shape({
    productName: Yup.string().required(),
    description: Yup.string().required(),
    price: Yup.number().required(),
    qty: Yup.number().required(),
    categoryId: Yup.string().required()
})


interface IPaginationQuery{
    page: number,
    limit: number,
    search?: string
}


export default {
    async create(req: Request, res: Response){
        /**
        #swagger.tags = ['Products']
         
        #swagger.requestBody = {
                    required: true,
                    schema: {
                        $ref: "#/components/schemas/CreateProductRequest"
                    }
                    }
        */
        try {
            const {productName, description, price, qty, categoryId} = req.body;
            
            await YproductSchema.validate({
                productName,
                description,
                price,
                qty,
                categoryId
            });

            const result = await productService.createProduct(req.body);

            res.status(200).json({
                message: `success to create product`,
                data: result
            })
        } catch (error) {
            const err = error as unknown as Error
            res.status(500).json({
                data: err.message,
                message: `failed to create product`
            })
        }
    },
    async getProducts(req: Request, res: Response){
        /**
         #swagger.tags = ['Products']
        */
        try {

            const {
                limit = 10,
                page = 1,
                search = " "
            } = req.query as unknown as IPaginationQuery;

            const query = {};

            if (search && search.trim() !== "") {
                Object.assign(query, {
                    name: {
                        $regex: search,
                        $options: "i",
                    }
                })
            }

            const options = {
                limit: Number(limit),
                skip: (Number(page) - 1) * Number(limit),
            }

            const result = await productService.getProducts(query, options);
            res.status(200).json({
                data: result,
                message: `success to get products`
            })
        } catch (error) {
            const err = error as unknown as Error
            res.status(500).json({
                data: err.message,
                message: `failed to get all product`
            })
        }
    },
    async getProductByID(req: Request,res: Response){
         /**
         #swagger.tags = ['Products']
         #swagger.requestBody = {
                    required: true,
                    schema: {
                        $ref: "#/components/schemas/getOneProduct"
                    }
                    }
        */
        try {
            const id = req.body._id;
            const result = await productService.getProductByID(id);
            res.status(200).json({
                data: result,
                message: `success to get product by id`
            })
        } catch (error) {
            const err = error as unknown as Error
            res.status(500).json({
                data: err.message,
                message: `failed to get product by id`
            })
        }
    },
    async updateProduct(req: Request, res: Response){
        /**
        #swagger.tags = ['Products']
        #swagger.requestBody = {
                    required: true,
                    schema: {
                        $ref: "#/components/schemas/UpdateProductRequest"
                    }
                    }#swagger.requestBody = {
                    required: true,
                    schema: {
                        $ref: "#/components/schemas/UpdateProductRequest"
                    }
                    }
        */
        try {
            const id  = req.body._id;
            const {productName, description, price, qty, categoryId} = req.body;
            
            await YproductSchema.validate({
                productName,
                description,
                price,
                qty,
                categoryId
            });

            const result = await productService.updateProduct(
                id,
                req.body
            )

            res.status(200).json({
                message: 'update product successfully',
                data: result
            })
        } catch (error) {
            const err = error as unknown as Error
            res.status(501).json({
                message: 'failed to update product',
                data: err.message
            })
        }
    },
    async deleteProduct(req: Request, res: Response){
        /**
         #swagger.tags = ['Products']
        */
        try {
            const id = req.body?._id
            const result = await productService.deleteProduct(req.body._id);
            res.status(200).json({
                message: 'success to delete product',
                data: result
            })
        } catch (error) {
            const err = error as unknown as Error
            res.status(500).json({
                message: 'failed to delete product',
                data: err.message
            })
        }
    }

}
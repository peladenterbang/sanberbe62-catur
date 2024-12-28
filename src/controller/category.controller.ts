import * as Yup from "yup";
import { Request, Response } from "express";
import categoryService from "../services/category.service";

const YcategorySchema = Yup.object().shape({
    categoryName: Yup.string().required()
})

export default{
    async create(req: Request, res: Response) {
        /**
         #swagger.tags = ['Category']
        */
        try {
            const {categoryName} = req.body 
            await YcategorySchema.validate(
                {categoryName}
            )
            const result = await categoryService.createCategory(req.body)

            res.status(200).json({
                message: `success to create category`,
                data: result
            })
        } catch (error) {
            const err = error as unknown as Error
            res.status(500).json({
                message: 'failed to create category',
                data: err.message
            })
        }
    },
    async getAll(req:Request, res:Response){
        /**
         #swagger.tags = ['Category']
        */
        try {
            const result = await categoryService.getCategories();
            res.status(200).json({
                message: 'success to get all category',
                data: result
            })
        } catch (error) {
            const err = error as unknown as Error
            res.status(500).json({
                message: 'failed to get category',
                data: err.message
            })
        }
    },
    async delete(req: Request, res: Response){
        /**
         #swagger.tags = ['Category']
        */
        try {
            const id = req.body._id
            
            const result = await categoryService.deleteCategory(id);
            res.status(200).json({
                message: `success to delete category ${id}`,
                data: result
            })
        } catch (error) {
            const err = error as unknown as Error
            res.status(500).json({
                message: `failed to delete category`,
                data: err.message
            })
        }
    }

}
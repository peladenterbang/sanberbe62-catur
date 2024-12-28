import mongoose, { mongo, ObjectId, Types } from "mongoose";

const Schema = mongoose.Schema;

export interface Product {
    productName: string,
    description: string,
    price: number,
    qty: number,
    categoryId: Types.ObjectId,
    createdAt: string;
    updatedAt: string;
    _id?: Types.ObjectId;
}


const ProductSchema = new Schema(
    {
        productName: {
            type: Schema.Types.String,
            required: true,
        },
        description: {
            type: Schema.Types.String,
            required: true
        },
        price: {
            type: Schema.Types.Number,
            required: true 
        },
        qty: {
            type: Schema.Types.Number,
            required: true
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }
    },
    {
        timestamps: true
    }
)

const ProductModel = mongoose.model("Product", ProductSchema);

export default ProductModel;
import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true 
        },
        qty: {
            type: Number,
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
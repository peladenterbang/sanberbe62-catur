import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
   {
    categoryName: {
        type: String,
    },
    productCategory: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }]
   }
)


const CategoryModel = mongoose.model("Category", CategorySchema);

export default CategoryModel;
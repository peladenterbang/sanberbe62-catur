import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;


const OrderDetailSchema = new Schema(
    {
        product: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }],
        qty: {
            type: Number,
            required: true
        },
        subTotal: {
            type: Number,
            required: true
        },
        order: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order"
            }]
        }
    },
) 

const OrderDetailModel = mongoose.model("OrderDetail", OrderDetailSchema);

export default OrderDetailModel;
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        grandTotal : {
            type: Number,
        },
        status: {
            enum: ["pending", "completed", "cenceled"],
            default: ["pending"]
        },
        orderItems: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderDetail"
        }],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    }, 
    {
        timestamps: true
    }
)

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;
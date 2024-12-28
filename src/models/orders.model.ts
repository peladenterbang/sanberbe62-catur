import mongoose, { mongo } from "mongoose";
import mail from "../utils/mail";
import UserModel from "./user.model";
import { me } from "../services/auth.service";


const Schema = mongoose.Schema;


const OrderItemsSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const OrderSchema = new Schema(
    {
        grandTotal : {
            type: Number,
        },
        status: {
            type: String,
            enum: ["pending", "completed", "cancelled"],
            default: "pending"
        },
        orderItems: {
            type: [OrderItemsSchema],
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
    }, 
    {
        timestamps: true
    }
)

OrderSchema.post("save", async function (doc, next) {

    try {
        const order = doc;
        const userId = String(order.createdBy);

        const getUser = await me(userId);
        const emailUser = getUser.email      
        
        const productIds = order.orderItems.map(item => item.productId);
        const productNames = order.orderItems.map(item => item.name);
    
        const content = await mail.render('order-success.ejs',{
            idOrder: order.id,
            status: order.status,
            orderItems: order.orderItems,
            productIds,
            productNames,
        })
        await mail.send({
            to: emailUser,
            subject: "Create Order Success",
            content,
        })
    } catch (error) {
        const err = error as unknown as Error
        console.error("Error sending email:", err.message);
        next(err);
    }
    next();
})

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel
import mongoose from "mongoose";

const Schema = mongoose.Schema;


export interface User {
    fullName: string,
    username: string,
    email: string,
    password: string,
    roles: string,
    profilePicture: string,
    createdAt?: string
}

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        enum: ["admin", "user"],
        default: ["user"]
    },
    profilePicture: {
        type: String,
        default: "user.jpg"
    }
})

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
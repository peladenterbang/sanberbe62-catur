import mongoose from "mongoose";
import { encrypt } from "../utils/encryption";
import mail from "../utils/mail";

const Schema = mongoose.Schema;


export interface User {
    fullName: string,
    username: string,
    email: string,
    password: string,
    roles: string[],
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
        type: [String],
        enum: ["admin", "user"],
        default: ["user"]
    },
    profilePicture: {
        type: String,
        default: "user.jpg"
    }
})


UserSchema.pre("save", function(next) {
    const user = this;
    user.password = encrypt(user.password)
    next()
})

UserSchema.post("save", async function (doc, next) {
    const user = doc;


    const content = await mail.render('register-success.ejs',{
        username: user.username,
    })
    await mail.send({
        to: user.email,
        subject: "Registration success",
        content,
    })
    next();
})

UserSchema.pre("updateOne", function(next){
    const user = (this as unknown as {_update: any})._update as User
    user.password = encrypt(user.password)
    next()
})

UserSchema.methods.toJSON = function(){
    const user = this.toObject();
    delete user.password;
    return user 
}


const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
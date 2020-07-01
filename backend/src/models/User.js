import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    account: {
        name: String, 
        region: String
    },
    friends: [{
        name: {
            type: String, 
            required: true
        }, 
        region: {
            type: String, 
            required: true
        }
    }]
})

const User = mongoose.model("User", UserSchema);

export default User;
import mongoose, { model, Schema } from "mongoose";

mongoose.connect('mongodb+srv://Haarush:2275@cluster0.lywyj.mongodb.net/SecondBrain')


const UserSchema = new Schema({
    username:{type: String, unique:true},
    password:{type: String}
})

export const userModel = model('users',UserSchema)

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref:"Tag"}],
    UserId: {type: mongoose.Types.ObjectId, ref:"users", require:true}
})

export const ContentModel = model("content",ContentSchema)
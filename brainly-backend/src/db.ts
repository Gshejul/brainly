import mongoose, {model, Schema} from "mongoose";




mongoose.connect("mongodb+srv://gauri03777:9R3RHHda5Qa87Xff@cluster0.tisrp.mongodb.net/brainly")

console.log("mongodb database is connected")

const UserSchema = new Schema({
    username:{type:String, unique:true},
    password:String
})


export const UserModel =  model('User' , UserSchema);

const ContentSchema = new Schema({
    title:String,
    link:String,
    tags:[{type: mongoose.Types.ObjectId, ref:'Tags'}],
    userId:{type:mongoose.Types.ObjectId, ref:'User', required:true}
})


export const ContentModel = model("Content", ContentSchema);
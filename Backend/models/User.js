import mongoose, { Schema } from 'mongoose';

const UserSchema=new Schema({
    userEmail:{type:String,unique:true ,required:true},
    password:{type:String,required:true},
    username:{type:String,required:true},
    isOwner:Boolean
})

const UserModel=mongoose.model('User',UserSchema);

export default UserModel;
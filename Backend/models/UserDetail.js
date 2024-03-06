import mongoose, { Schema } from 'mongoose';

const UserDetailSchema=new Schema({
    username:{type:String},
    userEmail:{type:String,unique:true},
    isOwner:Boolean

})

const UserDetailModel=mongoose.model('UserDetail',UserDetailSchema);

export default UserDetailModel;
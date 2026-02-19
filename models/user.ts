import mongoose,{Schema,model,models} from "mongoose";
import { AuthProviders } from "@/lib/constants/providers";


export interface IUser {
    userName:string,
    userEmail:string,
    password?:string,
    addresses?:string,
    provider?:AuthProviders
}

const userSchema=new Schema<IUser>(
    {
        userName:{
            type:String,required:true
        },
        userEmail:{
            type:String,required:true,unique:true
        },
        password:{
            type:String,required:true
        },
        provider:{
            type:String,required:true
        }
    },{
        timestamps:true
    }
)


export const User= models.User || model<IUser>("user",userSchema)
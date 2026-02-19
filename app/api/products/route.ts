import { connectDB } from "@/lib/db/connect";
import { NextResponse } from "next/server";
import { Product } from "@/models/product";

export async function GET(req: Request) {
  try{

    const connection=await connectDB();
    
    const res=await Product.find();
    console.log("response",res);
    // console.log(connection);
    
    // console.log("request", req);
    return NextResponse.json({ 
      data:res,
      success:true,
      message: "Product API working" },
      { status: 200 });
    }catch(error){
      return NextResponse.json({
        success:false,
        message:error?.message || "Internal Server Error"
      })
    }
}

export async function POST(req:Request){
  try{
const data=req.json();
const {name}=data;
console.log(name);
return NextResponse.json({
  message:"post working ",
  success:true
},{status:200})

  }catch(error){
return NextResponse.json({
  success:false,
  message:error?.message || "Internal Server Error"
})
  }
}
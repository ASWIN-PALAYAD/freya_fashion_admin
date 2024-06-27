import Product from "@/lib/models/Product";
import { connectDb } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const  GET = async(req:NextRequest,{params}:{params:{query:string}}) => {
    try {
        await connectDb();
        const searchedProducts = await Product.find({
            $or:[
                {title:{$regex:params.query,$options:'i'}},
                {category:{$regex:params.query,$options:'i'}},
                {tags:{$in:[new RegExp(params.query,'i')]}}
            ]
        })
        return NextResponse.json(searchedProducts,{status:200})
    } catch (error) {
        console.log('[search_GET]',error);
        return new NextResponse("Internal server error",{status:500});
    }
}
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { connectDb } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";

//create product
export const POST = async (req:NextRequest) => {
    try {
        const {userId} = auth();
        if(!userId){
            return new NextResponse("Unauthorized",{status:401});
        }
         await connectDb();
        const {title,description,media,category,collections,tags,sizes,colors,price,expense} = await req.json();
        if(!title || !description || !media || !category || !price || !expense){
            return new NextResponse('Not enough data to create a product',{status:400});
        }
        const newProducct = await Product.create({
            title,description,media,category,collections,tags,sizes,colors,price,expense
        });
        await newProducct.save();
        return NextResponse.json(newProducct,{status:200})
    } catch (error) {
        console.log('[products_post]',error);
        return new NextResponse("Internal error",{status:500})
        
    }
}
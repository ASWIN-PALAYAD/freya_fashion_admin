import Collection from "@/lib/models/Collection";
import { connectDb } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest) => {
    try {
        const {userId} = auth();
        console.log(userId);
        
        if(!userId){
            return new NextResponse("Unauthorized",{status:403});
        }

        await connectDb();
        const {title,description,image} = await req.json();
        const existingCollection = await Collection.findOne({title});
        if(existingCollection){
            return new NextResponse("Collection already exist",{status:400});
        }
        if(!title || !image){
            return new NextResponse("Title and image are required",{status:400});
        }
        const newCollection = await Collection.create({
            title,description,image
        });
        await newCollection.save();

        return NextResponse.json(newCollection,{status:200});

    } catch (err) {
        console.log('[collection_post]',err);
        return new NextResponse('internal Server Error',{status:500});
    }
}
//delete collection from admin panel

import Collection from "@/lib/models/Collection";
import { connectDb } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async(req:NextRequest,{params}:{params:{collectionId:string}}) => {
    try {
        const {userId} = auth();
        if(!userId){
            return new NextResponse('Unauthorized',{status:401});
        }
        await connectDb();
        await Collection.findByIdAndDelete(params.collectionId);
        return new NextResponse('Collection is deleted',{status:200})
    } catch (error) {
        console.log('[collectionId_delete',error);
        return new NextResponse('Internal server error',{status:500});
        
    }
}
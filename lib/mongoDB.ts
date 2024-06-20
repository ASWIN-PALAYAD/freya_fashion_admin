import mongoose from "mongoose";

let isConnected = false;

export const connectDb = async():Promise<void> =>  {
    mongoose.set("strictQuery", true)
    if(isConnected){
        console.log('Mongodb is already connected');
    }

    try {
        
        await mongoose.connect(process.env.MONGODB_URL || '',{
            dbName:'freya_admin'
        })
        isConnected = true;
        console.log("mongodb is connected");
        
    } catch (error) {
        console.log(error);
        
    }
}
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { connectDb } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";
import Collection from "@/lib/models/Collection";

//create product
export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await connectDb();
    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();
    if (!title || !description || !media || !category || !price || !expense) {
      return new NextResponse("Not enough data to create a product", {
        status: 400,
      });
    }
    const newProducct = await Product.create({
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    });
    await newProducct.save();
    return NextResponse.json(newProducct, { status: 200 });
  } catch (error) {
    console.log("[products_post]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

//get all products
export const GET = async (req: NextRequest) => {
  try {
    await connectDb();
    const products = await Product.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "collections", model: Collection });
      return NextResponse.json(products,{status:200});
  } catch (error) {
    console.log("[products_get]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

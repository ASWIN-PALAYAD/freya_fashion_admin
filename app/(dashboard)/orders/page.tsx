"use client";

import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/orders/OrderColumns";
import { Separator } from "@/components/ui/separator";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([])

  const getOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const orders = await res.json();
      setOrders(orders)
      setLoading(false);
    } catch (error) {
      console.log("[order_GET]", error);
      return new NextResponse("Internal server error",{status:500});
    }
  };

  useEffect(()=>{
    getOrders();
  },[])

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Orders</p>
      <Separator className="bg-grey-1 my-5" />
      <DataTable columns={columns} data={orders} searchKey="_id" />
    </div>
  );
};

export const dynamic = "force-dynamic"
export default Orders;

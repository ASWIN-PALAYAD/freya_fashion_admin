"use client"

import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import toast from "react-hot-toast";

interface DeleteProps {
    id:string;
    item:string
}

const Delete:React.FC<DeleteProps> = ({item,id}) => {

    const [loading, setLoading] = useState(false);
    const onDelete = async()=>{
        try {
            setLoading(true);
            const itemType = item === "product" ? "products" : "collections"
            const res = await fetch(`/api/${itemType}/${id}`,{
                method:"DELETE"
            });
            if(res.ok){
                setLoading(false);
                window.location.href = (`${itemType}`)
                toast.success(`${item} deleted`);
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error("Something went wrong.. please try agian")
            
        }
    }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-1 text-white">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            {item}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-1 text-white" onClick={onDelete} >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;

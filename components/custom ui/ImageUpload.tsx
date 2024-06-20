"use client"

import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash } from "lucide-react";

import { Button } from "../ui/button";
import Image from "next/image";
import { useState } from "react";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const onUpload = (result: any) => {
    console.log(result);
    
    if (result?.info?.secure_url) {
      onChange(result.info.secure_url);
    }
  };

  const [resource, setResource] = useState();

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]" >
            <div className="absolute top-0 right-0 z-10">
              <Button onClick={()=>onRemove(url)} size='sm' className="bg-red-1 text-white">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ))}
      </div>
      <CldUploadWidget
        uploadPreset="elc2olw6"
        onSuccess={onUpload}
        // onSuccess={(result, { widget }) => {  
        //   console.log(result);
          
        //     onChange(result?.info?.url);          
        //   widget.close();
        // }}
      >
        {({ open }) => {

function handleOnClick() {
    // setResource(undefined);
    open();
  }

          return (
            <Button onClick={handleOnClick} className="bg-grey-1 text-white">
              {" "}
              <Plus className="h-4 w-4 mr-2 " /> Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface MultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiText: React.FC<MultiTextProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setinputValue] = useState("");

  const addTag = (item: string) => {
    onChange(item);
    setinputValue("");
  };

  return (
    <>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setinputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTag(inputValue);
          }
        }}
      />
      <div className="flex gap-1 flex-wrap mt-4">
        {value.map((tag, index) => (
          <Badge
            key={index}
            className="bg-grey-1 text-white rounded-xl outline-none"
          >
            {tag}
            <Button
              className="ml-1 rounded-full outline-none hover:bg-red-1"
              onClick={() => onRemove(tag)}
              size='sm'
            >
              <X  className="h-3 w-3"/>
            </Button>
          </Badge>
        ))}
      </div>
    </>
  );
};

export default MultiText;

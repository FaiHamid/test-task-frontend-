import { Button, TextField } from "@mui/material";
import React, { useRef } from "react";
import { Avatar } from "../components/avatar";

export const NewCompany: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    // Викликаємо клік на input для відкриття провідника
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Тут ви можете обробити завантажений файл (наприклад, зберегти його)
      console.log("Завантажений файл:", file);
    }
  };
  return (
    <div className="rounded-md bg-white p-10 border border-light-blue">
    <p className="text-[36px] font-semibold mb-3">Add new company:</p>
    <div className="">
      <div>
        <div onClick={handleClick} className="cursor-pointer mb-2">
          <Avatar size={150} source='https://i.imgur.com/E9Yh93D.png' altText='add company logotype'/>
        </div>
        
        <input
          type="file"
          accept="image/jpeg, image/png" 
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }} 
        />
      </div>
        <p className="text-semi-gray mb-2 ml-6">add logotype</p>
    </div>
    <div className="grid ">
      <div className=" mr-10">
        <p className="mb-3 font-semibold">Name:</p>
      <TextField
        id="outlined-basic"
        variant="outlined"
        value="Loren"
        // onChange={(e) => changeUserState(e.target.value, "email")}
        sx={{ mb: "25px", width: "100%" }}
      />
      </div>
      <div className="">
        <p className="mb-3 font-semibold">Surname:</p>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value="Ipsumovich"
          // onChange={(e) => changeUserState(e.target.value, "email")}
          sx={{ mb: "35px", width: "100%" }}
        />
      </div>
      
      
    </div>
    <Button variant="contained" sx={{ mb: "50px"}}> Save</Button>
    
  </div>
  )
}
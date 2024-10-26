import React, { useRef, useState } from "react";
import { Avatar } from "../components/avatar";
import { Button, TextField } from "@mui/material";
import { useUsersContext } from "../controllers/useUsersContext";
import { LogoutComponent } from "../services/logoutService";
import { EVariantLogout, IUserToChange } from "../types/User";

export const Profile: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { currentUser } = useUsersContext();
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [dataToChange, setDataToChange] = useState<IUserToChange>({
    name: currentUser?.name || '',
    surname: currentUser?.surname || '',
  })
  

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCancelUpload = () => {
    setSelectedFile(null);
    setPreviewURL(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      console.log("Завантажений файл:", file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveData = () => {

  }

  const changeUserState = (newValue: string, field: keyof IUserToChange) => {
    setDataToChange((prevUser) => ({ ...prevUser, [field]: newValue }));
  };

  return (
    <div className="rounded-md bg-white p-10 border border-light-blue">
      <div className="flex items-center mb-10 relative">
        <Avatar size={150} source={previewURL || 'https://i.imgur.com/aX3x1wT.png'} altText='avatar'/>
        {selectedFile && (
          <button
            onClick={handleCancelUpload}
            className="pointer w-10 h-10 bg-gray-100 rounded-full p-2 absolute 
            left-0 top-[100px] border-2 border-semi-gray"
          >
            <img src="https://i.imgur.com/KpD60ma.png" alt="Cancel Upload" />
          </button>
        )}
        <div className="relative">
          <button onClick={handleClick} className="pointer w-12 h-12 bg-light-blue rounded-full p-2 absolute right-2 top-5">
            <img src="https://i.imgur.com/ccmMXRa.png" alt="Upload Icon" />
          </button>
          <input
            type="file"
            accept="image/jpeg, image/png" 
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }} 
          />
        </div>
        <div className="ml-5">
          <p className="text-[24px] font-semibold mb-3">{`${currentUser?.name} ${currentUser?.surname}`}</p>
          <p className="text-semi-gray mb-2">{currentUser?.email}</p>
          <p className=" ">Role: User</p>
        </div>
      </div>
      <p className="text-[28px] font-semibold mb-5">Personal Data:</p>
      <div className="max-w-[400px]">
        <p className="mb-3 font-semibold">Name:</p>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={dataToChange.name}
          onChange={(e) => changeUserState(e.target.value, "name")}
          sx={{ mb: "25px", width: "100%" }}
        />
        <p className="mb-3 font-semibold">Surname:</p>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={dataToChange.surname}
          onChange={(e) => changeUserState(e.target.value, "surname")}
          sx={{ mb: "35px", width: "100%" }}
        />
        
      </div>
      <div className="flex flex-col max-w-[200px]">
          <Button 
            variant="contained" 
            sx={{ mb: "50px"}} 
            onClick={handleSaveData}
          > 
            Save
          </Button>
          <Button variant="contained" color="warning" sx={{ mb: "20px"}}> Reset password</Button>
          <LogoutComponent variant={EVariantLogout.Button} handleClick={() => {}}/>
        </div>
    </div>
  );
};

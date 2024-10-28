import React, { useEffect, useRef, useState } from "react";
import { ETargetObject } from "../types/Company";
import { Avatar } from "./avatar";
import { useUsersContext } from "../controllers/useUsersContext";

interface Props {
  previewURL: string | null;
  targetType: ETargetObject;
  selectedFile: File | null;
  onChangeSelectedFile: (value: File | null) => void;
  onChangePreviewURL: (value: string | null) => void;
}

export const UploadAvatarOrLogo: React.FC<Props> = ({
  previewURL,
  targetType,
  selectedFile,
  onChangePreviewURL,
  onChangeSelectedFile,
}) => {
  const [currentPicture, setCurrentPicture] = useState("");
  const { currentUser, currentCompany } = useUsersContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCancelUpload = () => {
    onChangeSelectedFile(null);
    onChangePreviewURL(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      onChangeSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        onChangePreviewURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    switch(targetType) {
      case ETargetObject.User:
        setCurrentPicture(currentUser?.avatar ?? 'https://i.imgur.com/aX3x1wT.png');
        break;
      case ETargetObject.Company:
        setCurrentPicture(currentCompany?.logotype || 'https://i.imgur.com/5MRjPJ9.png');
        break;
    }
  }, [])


  return (
    <>
      <Avatar
        size={150}
        source={previewURL || currentPicture || ""}
        altText="avatar"
      />
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
        <button
          onClick={handleClick}
          className="pointer w-12 h-12 bg-light-blue rounded-full p-2 absolute right-2 top-5"
        >
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
    </>
  );
};

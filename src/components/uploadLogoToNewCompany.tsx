import React, { useRef } from "react";
import { Avatar } from "./avatar";

interface Props {
  previewURL: string | null;
  selectedFile: File | null;
  onChangeSelectedFile: (value: File | null) => void;
  onChangePreviewURL: (value: string | null) => void;
}

export const UploadLogoToNewCompany: React.FC<Props> = ({
  previewURL,
  selectedFile,
  onChangePreviewURL,
  onChangeSelectedFile,
}) => {
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


  return (
    <>
      <Avatar
        size={150}
        source={previewURL || 'https://i.imgur.com/5MRjPJ9.png' }
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

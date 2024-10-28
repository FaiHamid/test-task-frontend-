import { Button, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { Avatar } from "../components/avatar";
import { Autocomplete, LoadScript } from "@react-google-maps/api";

export const NewCompany: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [address, setAddress] = useState('');
  const [_coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  // eslint-disable-next-line no-undef
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  
  // const mapContainerStyle = {
  //   height: "400px",
  //   width: "800px"
  // };

  const GOOGLE_API_KEY = import.meta.env.VITE_API_KEY;

  const handleAddressChange = (event) => {
    const value = event.target.value;
    setAddress(value);
    
    if (autocomplete) {
      autocomplete.set('place', null); 
    }
  };

  const handlePlaceSelect = () => {
    if (autocomplete) {
          const place = autocomplete.getPlace();
    if (place && place.geometry) {
      const { lat, lng } = place.geometry.location;
      setCoordinates({ lat: lat(), lng: lng() });
      setAddress(place.formatted_address || '');
    }
    }
  };


  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log("Завантажений файл:", file);
    }
  };
  return (
    <div className="rounded-md bg-white p-10 border border-light-blue">
      <p className="text-[36px] font-semibold mb-3">Add new company:</p>
      <div className="">
        <div>
          <div onClick={handleClick} className="cursor-pointer mb-2">
            <Avatar
              size={150}
              source="https://i.imgur.com/E9Yh93D.png"
              altText="add company logotype"
            />
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
      <div className="max-w-[400px]">
        <p className="mb-3 font-semibold">Name:</p>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value="Loren"
          // onChange={(e) => changeUserState(e.target.value, "email")}
          sx={{ mb: "25px", width: "100%" }}
        />

        <p className="mb-3 font-semibold">Service:</p>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value="Ipsumovich"
          // onChange={(e) => changeUserState(e.target.value, "email")}
          sx={{ mb: "35px", width: "100%" }}
        />

        <p className="mb-3 font-semibold">Capital:</p>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value="Ipsumovich"
          // onChange={(e) => changeUserState(e.target.value, "email")}
          sx={{ mb: "35px", width: "100%" }}
        />

        <LoadScript
          googleMapsApiKey={GOOGLE_API_KEY}
          libraries={["places"]}
        >
          <Autocomplete
            onLoad={(autocomplete) => setAutocomplete(autocomplete)}
            onPlaceChanged={handlePlaceSelect}
          >
            <>
            <p className="mb-3 font-semibold">Address:</p>
            <TextField
              type="text"
              value={address}
              onChange={handleAddressChange}
              placeholder="Enter address"
              sx={{ mb: "35px", width: "100%" }}
            />
            </>
          </Autocomplete>

          {/* {coordinates && (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={coordinates}
              zoom={10}
            >
              <Marker position={coordinates} />
            </GoogleMap>
          )} */}
        </LoadScript>
      </div>
      <Button variant="contained" sx={{ mb: "50px" }}>
        {" "}
        Save
      </Button>
    </div>
  );
};

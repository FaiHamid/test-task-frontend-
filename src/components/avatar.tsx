import React from "react";

interface Props {
  size: number;
  source: string;
  altText: string;
}

export const Avatar: React.FC<Props> = ({ size, source, altText }) => {

  return (
    <div className='rounded-full shadow-lg p-1 mr-3 bg-gray-200 overflow-hidden'
    style={{ height: size, width: size }}>
    <img src={source} alt={altText} className="object-cover"/>
  </div>
  )
}
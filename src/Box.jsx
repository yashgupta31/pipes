import React, { useState } from "react";
import './Box.css';

const Box = ({ coordinates, imageSize, index, setCount }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Image's original resolution (actual intrinsic size)
  const originalWidth = 1200; 
  const originalHeight = 1600;

  // Scaling factor
  // const scaleX = imageSize.width / originalWidth;
  // const scaleY = imageSize.height / originalHeight;
  const scaleX = imageSize.width > 0 ? imageSize.width / originalWidth : 1;
const scaleY = imageSize.height > 0 ? imageSize.height / originalHeight : 1;

  // Calculate box position
  const left = Math.min(...coordinates.map((c) => c[0])) * scaleX;
  const top = Math.min(...coordinates.map((c) => c[1])) * scaleY;
  const right = Math.max(...coordinates.map((c) => c[0])) * scaleX;
  const bottom = Math.max(...coordinates.map((c) => c[1])) * scaleY;

  // const width = right - left;
  // const height = bottom - top;
  const width = right !== left? right - left : 23;
  const height = right !== left? bottom - top: 23;

const boxStyle = {
    position: "absolute",
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`,
    border: isVisible ? "2px solid blue" : "none",
    backgroundColor: isVisible ? "rgba(0, 0, 255, 0.2)" : "transparent",
    cursor: "pointer",
    borderRadius: '50%', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
    setCount((prev) => (isVisible ? prev - 1 : prev + 1));

  };

  

  return (
    
  <div style={boxStyle} onClick={handleClick} className="each-pipes">
    {isVisible && <span style={{fontSize: '0.7rem'}}>{index + 1}</span>}
  </div>)
};

export default Box;

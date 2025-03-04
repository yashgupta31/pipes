import React, { useState } from "react";

const Box = ({ coordinates, imageSize, index }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Image's original resolution (actual intrinsic size)
  const originalWidth = 3468;
  const originalHeight = 4624;

  // Scaling factor
  const scaleX = imageSize.width / originalWidth;
  const scaleY = imageSize.height / originalHeight;

  // Calculate box position
  const left = Math.min(...coordinates.map((c) => c[0])) * scaleX;
  const top = Math.min(...coordinates.map((c) => c[1])) * scaleY;
  const right = Math.max(...coordinates.map((c) => c[0])) * scaleX;
  const bottom = Math.max(...coordinates.map((c) => c[1])) * scaleY;

  const width = right - left;
  const height = bottom - top;

//   const boxStyle = {
//     position: "absolute",
//     left: `${left}px`,
//     top: `${top}px`,
//     width: `${width}px`,
//     height: `${height}px`,
//     border: "2px solid blue",
//     backgroundColor: "rgba(0, 0, 255, 0.2)",
//     cursor: "pointer",
//     opacity: isVisible ? 1 : 0, // Hide without removing from DOM
//     pointerEvents: isVisible ? "auto" : "none", // Allow clicks when hidden
//     borderRadius: '50%'
//   };
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

  return (
  <div style={boxStyle} onClick={() => setIsVisible(!isVisible)}>
    {isVisible && <span style={{fontSize: '0.7rem'}}>{index + 1}</span>}
  </div>)
};

export default Box;

// import React, { useEffect, useState } from "react";
// import "./Box.css";

// const Box = ({ coordinates, imageSize, index, setCount, setTypeCount, setPipeColor, setBoxes, cumulativeSum, resize}) => {
//   const [isRemoved, setIsRemoved] = useState(false);
//   if (isRemoved) return null; // 🔥 Completely remove from UI when clicked

//   // Image's original resolution (actual intrinsic size)
//   const originalWidth = 1271;
//   const originalHeight = 1324;

//   // Scaling factor
//   const scaleX = imageSize.width > 0 ? imageSize.width / originalWidth : 1;
//   const scaleY = imageSize.height > 0 ? imageSize.height / originalHeight : 1;

//   // Extract coordinates
//   const x1 = coordinates[0] * scaleX;
//   const y1 = coordinates[1] * scaleY;
//   const x2 = coordinates[2] * scaleX;
//   const y2 = coordinates[3] * scaleY;
//   const pipeCount = coordinates[4]; // Number of pipes


//   // Calculate dimensions
//   const left = x1;
//   const top = y1;
//   const width = x2 - x1 !== 0 ? x2 - x1 : 23;
//   const height = y2 - y1 !== 0 ? y2 - y1 : 23;

//   const borderColor =
//     pipeCount === 1
//       ? "orange"
//       : pipeCount === 2
//       ? "blue"
//       : pipeCount === 3
//       ? "red"
//       :pipeCount === 4
//       ? "green":
//       'purple'

//   const boxStyle = {
//     position: "absolute",
//     left: `${left}px`,
//     top: `${top}px`,
//     width: `${width}px`,
//     height: `${height}px`,
//     border: `2px solid ${borderColor}`,
//     backgroundColor: pipeCount==1? "rgba(146, 85, 11, 0.2)": pipeCount == 2? "rgba(138, 138, 212, 0.2)": pipeCount == 3? "rgba(253, 0, 0, 0.28)": pipeCount == 4? "rgba(0, 253, 13, 0.21)": "rgba(223, 0, 253, 0.21)",
//     cursor: "pointer",
//     borderRadius: "50%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: 'white'
//   };


//   // const handleClick = () => {
//   //   setIsRemoved(true); // Remove the element from UI
//   //   setCount((prev) => prev - pipeCount);
//   //   setTypeCount((prev) => ({
//   //     ...prev,
//   //     [pipeCount]: prev[pipeCount] - 1,
//   //   }));
  
//   //   console.log("Removing index:", index);
    
//   //   setBoxes((prevBoxes) => {
//   //     const newBoxes = [...prevBoxes];
//   //     newBoxes.splice(index, 1); // Correctly remove only the clicked element
//   //     return newBoxes;
//   //   });
  
//   //   setPipeColor(pipeCount);
//   // };

//   const handleClick = () => {
//     setIsRemoved(true); // Remove the element from UI
//     setCount((prev) => prev - pipeCount);
//     setTypeCount((prev) => ({
//       ...prev,
//       [pipeCount]: prev[pipeCount] - 1,
//     }));
  
//     console.log("Removing index:", index);
  
//     // Filter out the box at the clicked index
    
//     setBoxes((prevBoxes) => prevBoxes.filter((_, i) => i !== index));
  
//     setPipeColor(pipeCount);

//   };

  


//   return (
//     <div style={boxStyle} onClick={handleClick} className="each-pipes">
//       <span style={{ color: "black" }}>{cumulativeSum}</span>
//     </div>
//   );
// };

// export default Box;

import React, { useEffect, useState } from "react";
import "./Box.css";

const Box = ({ coordinates, imageSize, index, setCount, setTypeCount, setPipeColor, setBoxes, cumulativeSum }) => {
  const [isRemoved, setIsRemoved] = useState(false);
  if (isRemoved) return null;

  // Image's original resolution
  const originalWidth = 1599;
  const originalHeight = 1200;
  // Scaling factors
  const scaleX = imageSize.width > 0 ? imageSize.width / originalWidth : 1;
  const scaleY = imageSize.height > 0 ? imageSize.height / originalHeight : 1;

  let x1, y1, x2, y2, pipeCount;

  if (Array.isArray(coordinates[0])) {
    // **Handling xyxyxyxy Format**
    const points = coordinates.slice(0, 4); // Extract 4 points
    pipeCount = coordinates[4];

    // Find min/max x and y to get bounding box
    x1 = Math.min(...points.map((p) => p[0])) * scaleX;
    y1 = Math.min(...points.map((p) => p[1])) * scaleY;
    x2 = Math.max(...points.map((p) => p[0])) * scaleX;
    y2 = Math.max(...points.map((p) => p[1])) * scaleY;
  } else {
    // **Handling xyxy Format**
    [x1, y1, x2, y2, pipeCount] = coordinates;
    x1 *= scaleX;
    y1 *= scaleY;
    x2 *= scaleX;
    y2 *= scaleY;
  }

  // Calculate box properties
  const left = x1;
  const top = y1;
  const width = x2 - x1 || 23;
  const height = y2 - y1 || 23;

  // Border and background color logic
  const colors = {
    1: { border: "orange", background: "rgba(146, 85, 11, 0.2)" },
    2: { border: "blue", background: "rgba(138, 138, 212, 0.2)" },
    3: { border: "red", background: "rgba(253, 0, 0, 0.28)" },
    4: { border: "green", background: "rgba(0, 253, 13, 0.21)" },
    default: { border: "purple", background: "rgba(223, 0, 253, 0.21)" },
  };

  const { border, background } = colors[pipeCount] || colors.default;

  const boxStyle = {
    position: "absolute",
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`,
    border: `2px solid ${border}`,
    backgroundColor: background,
    cursor: "pointer",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  };

  const handleClick = () => {
    setIsRemoved(true);
    setCount((prev) => prev - pipeCount);
    setTypeCount((prev) => ({ ...prev, [pipeCount]: prev[pipeCount] - 1 }));
    setBoxes((prevBoxes) => prevBoxes.filter((_, i) => i !== index));
    setPipeColor(pipeCount);
  };

  return (
    <div style={boxStyle} onClick={handleClick} className="each-pipes">
      <span style={{ color: "black" }}>{cumulativeSum}</span>
    </div>
  );
};

export default Box;

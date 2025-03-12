import React, { useState, useRef, useEffect } from "react";
import './App.css'
import Box from "./Box"; // Your Box component
import logo from './assets/logo.png'
import domtoimage from 'dom-to-image-more';
import { FaCamera } from "react-icons/fa";
import { RiNumber1 } from "react-icons/ri";
import html2canvas from "html2canvas";
import pipes from './assets/pipes.png'
import jsPDF from "jspdf";

const App = () => {
  const [boxes, setBoxes] = useState([[
    187.8782958984375,
    21.150320053100586,
    233.10922241210938,
    66.68363189697266,
    2
  ],
  [
    305.44024658203125,
    22.138662338256836,
    350.69659423828125,
    67.43641662597656,
    2
  ],
  [
    361.26422119140625,
    24.50763511657715,
    406.1716003417969,
    70.2666015625,
    2
  ],
  [
    242.08351135253906,
    24.939411163330078,
    287.4119873046875,
    70.591064453125,
    2
  ],
  [
    417.2679138183594,
    29.425643920898438,
    462.2292175292969,
    74.41205596923828,
    2
  ],
  [
    473.051025390625,
    30.761653900146484,
    518.04736328125,
    76.32794189453125,
    2
  ],
  [
    529.6255493164062,
    34.58107376098633,
    574.1351318359375,
    79.88988494873047,
    2
  ],
  [
    584.0564575195312,
    38.280513763427734,
    629.0215454101562,
    83.48259735107422,
    2
  ],
  [
    118.8985824584961,
    54.36491394042969,
    164.1964111328125,
    100.07866668701172,
    2
  ],
  [
    275.49267578125,
    56.404685974121094,
    321.75457763671875,
    101.07034301757812,
    2
  ],
  [
    332.09100341796875,
    59.893253326416016,
    377.8072814941406,
    104.45643615722656,
    2
  ],
  [
    213.5374755859375,
    59.66730499267578,
    258.96014404296875,
    104.6931381225586,
    2
  ],
  [
    166.4698486328125,
    61.11170959472656,
    212.07899475097656,
    106.78656768798828,
    2
  ],
  [
    386.5489807128906,
    62.56888198852539,
    432.1721496582031,
    107.25408172607422,
    2
  ],
  [
    801.7755737304688,
    65.55854034423828,
    846.3276977539062,
    110.30297088623047,
    2
  ],
  [
    442.14508056640625,
    66.02617645263672,
    488.2834167480469,
    110.30228424072266,
    2
  ]])

  // const [uniqueImageUrl, setUniqueImageUrl] = useState("");
  
  const [count, setCount] = useState(2063);  // Set initial count based on existing boxes
  const [typeCount, setTypeCount]= useState({1: 0, 2: 0, 3: 0, 4: 0})
  const [pipeColor, setPipeColor]= useState(1)
  const imageRef = useRef(null);
  // const canvasRef = useRef(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateImageSize = () => {
      if (imageRef.current) {
        setImageSize({
          width: imageRef.current.clientWidth,
          height: imageRef.current.clientHeight,
        });
      }
    };
  
    updateImageSize(); // Update initially
    window.addEventListener("resize", updateImageSize); // Update on resize
  
    return () => window.removeEventListener("resize", updateImageSize);
  }, []);




  const handleImageClick = (e) => {
    if (!imageRef.current) return;
  
    const imageRect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - imageRect.left;
    const y = e.clientY - imageRect.top;
    const originalWidth = 1271; 
    const originalHeight = 1324;
    const scaleX = originalWidth / imageSize.width;
    const scaleY = originalHeight / imageSize.height;
  
    const boxSize = 50;
    const adjustedX = Math.round((x * scaleX) - boxSize / 2);
    const adjustedY = Math.round((y * scaleY) - boxSize / 2);
  
    setBoxes((prevBoxes) => {
      const newBoxes = [...prevBoxes, [adjustedX, adjustedY, adjustedX + boxSize, adjustedY + boxSize, pipeColor]];
  
      // Update count for the selected pipeColor
      // setTypeCount((prevTypeCount) => ({
      //   ...prevTypeCount,
      //   [pipeColor]: (prevTypeCount[pipeColor] || 0) + 1,
      // }));
  
      return newBoxes;
    });
  
    // Update total count correctly
    setCount((prevCount) => prevCount + pipeColor);
  };

  
  

  // -------Download the image after button click----------
  
//   const downloadImage = () => {
//   const element = document.getElementById("captureArea");
//   const captureButton = document.getElementById("captureButton");
//   const pipeSizeButton = document.getElementById("pipeSizeButton");

//   // Hide buttons before capturing
//   if (captureButton) captureButton.style.display = "none";
//   if (pipeSizeButton) pipeSizeButton.style.display = "none";

//   domtoimage.toPng(element, {useCORS: true, quality: 1, bgcolor: "white" })
//     .then((dataUrl) => {
//       const link = document.createElement("a");
//       link.href = dataUrl;
//       link.download = "downloaded-image.png";
//       link.click();
//     })
//     .catch((error) => console.error("Error generating image:", error))
//     .finally(() => {
//       // Ensure buttons are restored
//       if (captureButton) captureButton.style.display = "flex";
//       if (pipeSizeButton) pipeSizeButton.style.display = "flex";
//     });
// };


// const downloadImage = () => {
//   const element = document.getElementById("captureArea");
//   const captureButton = document.getElementById("captureButton");
//   const pipeSizeButton = document.getElementById("pipeSizeButton");

//   // Hide buttons before capturing
//   if (captureButton) captureButton.style.display = "none";
//   if (pipeSizeButton) pipeSizeButton.style.display = "none";

//   html2canvas(element, { useCORS: true, backgroundColor: "white", scale: 2 })
//     .then((canvas) => {
//       const dataUrl = canvas.toDataURL("image/png");
//       const link = document.createElement("a");
//       link.href = dataUrl;
//       link.download = "downloaded-image.png";
//       link.click();
//     })
//     .catch((error) => console.error("Error generating image:", error))
//     .finally(() => {
//       // Restore button visibility
//       if (captureButton) captureButton.style.display = "flex";
//       if (pipeSizeButton) pipeSizeButton.style.display = "flex";
//     });
// };

// const downloadImage = () => {
//   const element = document.getElementById("captureArea");
//   const captureButton = document.getElementById("captureButton");
//   const pipeSizeButton = document.getElementById("pipeSizeButton");

//   // Hide buttons before capturing
//   if (captureButton) captureButton.style.display = "none";
//   if (pipeSizeButton) pipeSizeButton.style.display = "none";

//   html2canvas(element, {logging: true,  useCORS: true, backgroundColor: "white", scale: 2 })
//     .then((canvas) => {
//       const dataUrl = canvas.toDataURL("image/png");

//       // Open the image in a new tab instead of auto-downloading
//       const newTab = window.open();
//       newTab.document.write('<img src="' + dataUrl + '" />');

//       // If you still want the download, keep this part
//       const link = document.createElement("a");
//       link.href = dataUrl;
//       link.download = "downloaded-image.png";
//       link.click();
//     })
//     .catch((error) => console.error("Error generating image:", error))
//     .finally(() => {
//       // Restore button visibility
//       if (captureButton) captureButton.style.display = "flex";
//       if (pipeSizeButton) pipeSizeButton.style.display = "flex";
//     });
// };

// --------download in pdf-----------
// const downloadImage = () => {
//   const element = document.getElementById("captureArea");
//   const captureButton = document.getElementById("captureButton");
//   const pipeSizeButton = document.getElementById("pipeSizeButton");

//   // Hide buttons before capturing
//   if (captureButton) captureButton.style.display = "none";
//   if (pipeSizeButton) pipeSizeButton.style.display = "none";

//   html2canvas(element, { useCORS: true, backgroundColor: "white", scale: 2 })
//     .then((canvas) => {
//       // Create a new jsPDF instance
//       const pdf = new jsPDF();

//       // Add the captured image (canvas) to the PDF
//       const imgData = canvas.toDataURL("image/png");
//       pdf.addImage(imgData, "JPEG", 10, 10, 180, 160); // Adjust positioning and size as needed

//       // Save the PDF
//       pdf.save("downloaded-file.pdf"); 
//     })
//     .catch((error) => console.error("Error generating PDF:", error))
//     .finally(() => {
//       // Restore button visibility
//       if (captureButton) captureButton.style.display = "flex";
//       if (pipeSizeButton) pipeSizeButton.style.display = "flex";
//     });
// };

// --------------------------------------------------
// ------------blob-------------- working fine locally-------
// const downloadImage = () => {
//   const element = document.getElementById("captureArea");
//   const captureButton = document.getElementById("captureButton");
//   const pipeSizeButton = document.getElementById("pipeSizeButton");

//   // Hide buttons before capturing
//   if (captureButton) captureButton.style.display = "none";
//   if (pipeSizeButton) pipeSizeButton.style.display = "none";

//   html2canvas(element, { useCORS: true, backgroundColor: "white", scale: 2 })
//     .then((canvas) => {
//       canvas.toBlob((blob) => {
//         if (blob) {
//           const url = URL.createObjectURL(blob);
//           const link = document.createElement("a");
//           link.href = url;
//           link.download = "downloaded-image.png";
//           document.body.appendChild(link);
//           link.click();
//           document.body.removeChild(link);
//           URL.revokeObjectURL(url); // Clean up memory
//         }
//       }, "image/png");
//     })
//     .catch((error) => console.error("Error generating image:", error))
//     .finally(() => {
//       // Restore button visibility
//       if (captureButton) captureButton.style.display = "flex";
//       if (pipeSizeButton) pipeSizeButton.style.display = "flex";
//     });
// };
// --------------------------------------------------------

// // Direct download approach using the original URL
// const downloadImage = () => {
//   try {
//     // Extract filename from URL
//     let imageUrl= "https://alvision-count.s3.ap-south-1.amazonaws.com/count/DrawTest/original/2025/03/original_9a470183-4736-456e-a0ba-436a11dc8825.png";
//     const urlParts = imageUrl.split('/');
//     const filename = urlParts[urlParts.length - 1] || 'image.png';
    
//     // Create an anchor element and trigger download
//     const link = document.createElement('a');
//     link.href = imageUrl;
//     link.download = filename;
//     link.rel = "noopener noreferrer";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
    
//   } catch (err) {
//     console.error("Error initiating download:", err);
//     // setError("Download failed. Try right-click and 'Save Image As' instead.");
//   }
// };


const downloadImage = () => {
  const element = document.getElementById("captureArea");
  const captureButton = document.getElementById("captureButton");
  const pipeSizeButton = document.getElementById("pipeSizeButton");

  // Hide buttons before capturing
  if (captureButton) captureButton.style.display = "none";
  if (pipeSizeButton) pipeSizeButton.style.display = "none";

  setTimeout(() => {
    html2canvas(element, {
      useCORS: true,  // Allow cross-origin images
      backgroundColor: "white",
      scale: 2,  // Increase scale for better quality
    })
      .then((canvas) => {
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "downloaded-image.png";
        link.click();
      })
      .catch((error) => console.error("Error generating image:", error))
      .finally(() => {
        // Restore button visibility
        if (captureButton) captureButton.style.display = "flex";
        if (pipeSizeButton) pipeSizeButton.style.display = "flex";
      });
  }, 300); // Small delay to allow rendering
};





  useEffect(() => {
    let obj = { 1: 0, 2: 0, 3: 0, 4: 0 };
  
    boxes.forEach((elem) => {
      let pipeCount = elem[4]; // Extract pipeCount
  
      if (obj[pipeCount] !== undefined) {
        obj[pipeCount] += 1; // Increment count for this pipe type
      }
    });
  
    setTypeCount(obj);
  }, [boxes]); // Runs whenever `boxes` changes
  // console.log(typeCount)
  let cumulativeSum= 0;


//   const [imageLoaded, setImageLoaded] = useState(false);

// useEffect(() => {
//   const imgElement = document.getElementById("imageToCapture");
//   if (imgElement) {
//     if (imgElement.complete) {
//       setImageLoaded(true);
//     } else {
//       imgElement.onload = () => setImageLoaded(true);
//       imgElement.onerror = () => console.error("Image failed to load");
//     }
//   }
// }, []);

// const downloadImage = () => {
//   if (!imageLoaded) {
//     alert("Please wait, the image is still loading...");
//     return;
//   }

//   const element = document.getElementById("captureArea");
//   const captureButton = document.getElementById("captureButton");
//   const pipeSizeButton = document.getElementById("pipeSizeButton");

//   // Hide buttons before capturing
//   if (captureButton) captureButton.style.display = "none";
//   if (pipeSizeButton) pipeSizeButton.style.display = "none";

//   html2canvas(element, { logging: true, useCORS: true, backgroundColor: "white", scale: 2 })
//     .then((canvas) => {
//       const dataUrl = canvas.toDataURL("image/png");

//       // Open the image in a new tab
//       const newTab = window.open();
//       newTab.document.write('<img src="' + dataUrl + '" />');

//       // Optional: Allow download
//       const link = document.createElement("a");
//       link.href = dataUrl;
//       link.download = "downloaded-image.png";
//       link.click();
//     })
//     .catch((error) => console.error("Error generating image:", error))
//     .finally(() => {
//       // Restore button visibility
//       if (captureButton) captureButton.style.display = "flex";
//       if (pipeSizeButton) pipeSizeButton.style.display = "flex";
//     });
// };
  
  return (
    <div id="captureArea" >
      {/* <div> */}
      <div style={{padding: '0.3rem 1rem',  display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', justifyContent: 'space-between', backgroundColor: 'black'}}>
        <div className="pipecount-date-container" style={{color: 'white', display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
        <h2
        className="pipe-count">
          Total Pipes - {count}
        </h2>

        <span className="capture-date" >
  Date - {new Date("2025-03-06T12:42:31.864629").toLocaleString()}
</span>
        </div>

        {/* <div style={{display: 'flex', flexDirection: 'column', fontSize: '1.3rem', padding: '1rem'}}> */}
        <div className="type-wise-count" style={{ display: 'flex', flexWrap: 'wrap', padding: '0.5rem' }}>
  {Object.entries(typeCount).map(([pipeType, quantity]) =>
    quantity > 0 ? (
      <span className="each-type-count" key={pipeType} style={{color: 'white',  backgroundColor: 'grey', padding: '0.4rem 0.6rem', borderRadius: '8px', border: '1px solid black'}}>
        {pipeType}× pipes: {pipeType} × {quantity} = {pipeType * quantity}
      </span>
    ) : null
  )}
</div>
        {/* </div> */}

          </div>
      <div style={{ position: "relative", width: "100%"}}>

        <div>

        </div>

          {/* <div style={{position: "fixed",bottom: '2rem', right: '2rem', padding: '0.4rem', display: 'flex', zIndex: '999'}}> */}
          

          {/* --------manual pipe size selector-------- */}
          <div id="pipeSizeButton" style={{display: 'flex',  alignItems: 'center', justifyContent: 'space-evenly', width: '14rem',height: '3rem', position: "fixed", bottom: '2rem', right: '2rem',  zIndex: '999'}}>
            <div className="each-pipesizeButton" onClick={()=> setPipeColor(1)} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange', fontSize: '1.2rem', borderRadius: '50%', cursor: 'pointer'}}>1</div>
            <div className="each-pipesizeButton" onClick={()=> setPipeColor(2)} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue', fontSize: '1.2rem', borderRadius: '50%', cursor: 'pointer'}}>2</div>
            <div className="each-pipesizeButton" onClick={()=> setPipeColor(3)} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', fontSize: '1.2rem', borderRadius: '50%', cursor: 'pointer'}}>3</div>
            <div className="each-pipesizeButton" onClick={()=> setPipeColor(4)} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'green', fontSize: '1.2rem', borderRadius: '50%', cursor: 'pointer'}}>4</div>
            <div id="captureButton" style={{backgroundColor: 'red', height: '3rem', width: '3rem', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}
        onClick={downloadImage}
        >
          <FaCamera /></div>
          </div>

          {/* --------capture button----- */}
        
          {/* </div> */}
          {/* </div> */}

<img
id="imageToCapture"
src={"https://alvision-count.s3.ap-south-1.amazonaws.com/count/DrawTest/original/2025/03/original_9a470183-4736-456e-a0ba-436a11dc8825.png"} // Your image source
onError={() => console.error("Image failed to load")}
// onLoad={() => setImageLoaded(true)}
// key={uniqueImageUrl}
ref={imageRef}
// src={uniqueImageUrl}
style={{ width: "100%", display: "block" }}
  alt="Pipes"
  onClick={handleImageClick}
  // onLoad={() => {
  //   if (imageRef.current) {
  //     setImageSize({
  //       width: imageRef.current.clientWidth,
  //       height: imageRef.current.clientHeight,
  //     });
  //   }
  // }}
/>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%" }}>
          {boxes.map((coordinates, index) =>{ 
            cumulativeSum += coordinates[4]; // pipeCount is the 5th element
            return(
            <Box
            key={JSON.stringify(coordinates)}
              coordinates={coordinates}
              imageSize={imageSize}
              index={index}
              setCount={setCount} // Pass down the setCount function to Box component
              pipeColor={pipeColor}
              setTypeCount={setTypeCount}
              setBoxes={setBoxes}
              setPipeColor={setPipeColor}
              cumulativeSum={cumulativeSum}
            />)
          })}  
        </div>
      </div>

      {/* --------logo--------- */}
      <div style={{width: '100%', height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <img className="logo" src={logo} alt="alluvium logo" />
      </div>
    </div>
  );
};

export default App;




import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import Box from "./Box"; // Your Box component
import logo from "./assets/logo.png";
import { FaCamera } from "react-icons/fa";
import html2canvas from "html2canvas";
// import pipes from "./assets/pipes.png";
// import jsPDF from "jspdf";
// import HLSPlayer from "./HLSPlayer";
// import { RiNumber1 } from "react-icons/ri";
// import domtoimage from "dom-to-image-more";

const App = () => {
  const [boxes, setBoxes] = useState([
  [
    672.7781982421875,
    1221.39111328125,
    725.7883911132812,
    1270.635009765625,
    4
  ],
  [
    726.5736694335938,
    1223.3330078125,
    779.7767944335938,
    1272.928955078125,
    4
  ],
  [
    780.3128051757812,
    1226.90478515625,
    833.551513671875,
    1276.527587890625,
    4
  ],
  [
    833.8779907226562,
    1230.848876953125,
    886.6293334960938,
    1280.0655517578125,
    4
  ],
  [
    887.2177124023438,
    1234.9432373046875,
    939.9515991210938,
    1284.2186279296875,
    4
  ],
  [
    939.853515625,
    1238.5986328125,
    992.4586791992188,
    1287.8160400390625,
    4
  ],
  [
    993.0379638671875,
    1242.3148193359375,
    1045.9464111328125,
    1288.3765869140625,
    4
  ],
  [
    1046.0277099609375,
    1245.23876953125,
    1099.507080078125,
    1293.0438232421875,
    4
  ],
  [
    1100.4478759765625,
    1248.0621337890625,
    1154.445556640625,
    1296.6060791015625,
    4
  ]]);

  // const [uniqueImageUrl, setUniqueImageUrl] = useState("");
  // const [resize, setResize]= useState(false)

  const [count, setCount] = useState(0); // Set initial count based on existing boxes
  const [typeCount, setTypeCount] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  const [initialCounts, setInitialCounts]= useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 })
  const [pipeColor, setPipeColor] = useState(1);
  const [imgSize, setImgSize] = useState(0.9);
  const imageRef = useRef(null);
  const [loading, setLoading]= useState(false)
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
    const adjustedX = Math.round(x * scaleX - boxSize / 2);
    const adjustedY = Math.round(y * scaleY - boxSize / 2);

    setBoxes((prevBoxes) => {
      const newBoxes = [
        ...prevBoxes,
        [
          adjustedX,
          adjustedY,
          adjustedX + boxSize,
          adjustedY + boxSize,
          pipeColor,
        ],
      ];

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

  const waitForImagesToLoad = () => {
    return new Promise((resolve) => {
      const images = document.querySelectorAll("img");
      let loadedCount = 0;
      images.forEach((img) => {
        if (img.complete) {
          loadedCount++;
        } else {
          img.onload = img.onerror = () => {
            loadedCount++;
            if (loadedCount === images.length) resolve();
          };
        }
      });
      if (loadedCount === images.length) resolve();
    });
  };

  const downloadImage = async () => {
    setLoading(true)
    await waitForImagesToLoad(); // Ensure all images are loaded

    const element = document.getElementById("captureArea"); // Capture entire page
    const captureButton = document.getElementById("captureButton"); // Capture button reference
    const pipeSizeButton = document.getElementById("pipeSizeButton");

    // Hide the button before capturing
    captureButton.style.display = "none";
    pipeSizeButton.style.display = "none";

    // Ensure CORS compliance for external images
    document.querySelectorAll("img").forEach((img) => {
      if (!img.src.includes(window.location.origin)) {
        img.crossOrigin = "anonymous";
      }
    });

    // Capture screenshot
    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: true,
      scale: imgSize,
    });

    const imgData = canvas.toDataURL("image/png");

    // Restore the button after capturing
    captureButton.style.display = "flex";
    pipeSizeButton.style.display = "flex";

    // Create a download link
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "screenshot.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setLoading(false)
    // setTimeout(()=>{
    //   alert("Image captured successfully!");
    // }, 500)
    
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setImgSize(2.5);
      } else {
        setImgSize(1.5);
      }
    };

    handleResize(); // Check size initially
    window.addEventListener("resize", handleResize); // Listen for resize events

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let obj = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    boxes.forEach((elem) => {
      let pipeCount = elem[4]; // Extract pipeCount

      if (obj[pipeCount] !== undefined) {
        obj[pipeCount] += 1; // Increment count for this pipe type
      }
    });

    setTypeCount(obj);
  }, [boxes]); // Runs whenever `boxes` changes

  useEffect(() => {
    let obj = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let totalPipes = 0;

    boxes.forEach((elem) => {
      let pipeCount = elem[4]; // Extract pipeCount

      if (obj[pipeCount] !== undefined) {
        obj[pipeCount] += 1; // Increment count for this pipe type
      }
    });

    // // Calculate total pipes correctly
    totalPipes = Object.entries(obj).reduce((sum, [type, count]) => {
      return sum + Number(type) * count; // Multiply type (pipe nesting level) with its count
    }, 0);

    setCount(totalPipes);
    setInitialCounts(obj);
  }, []);
  // console.log(typeCount)
  let cumulativeSum = 0;

    const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const imgElement = document.getElementById("imageToCapture");
    if (imgElement) {
      if (imgElement.complete) {
        setImageLoaded(true);
      } else {
        imgElement.onload = () => setImageLoaded(true);
        imgElement.onerror = () => console.error("Image failed to load");
      }
    }
  }, []);

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

  const divRef = useRef(null);
  const draggingRef = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  // **Initialize in Center (Vertically)**
  const [position, setPosition] = useState({
    x: window.innerWidth - 60, // Right-side position
    y: window.innerHeight / 2 - 90, // Center vertically
  });

  // **Keep div inside viewport on resize**
  useEffect(() => {
    const handleResize = () => {
      setPosition((prevPos) => ({
        x: Math.min(prevPos.x, window.innerWidth - 60),
        y: Math.min(prevPos.y, window.innerHeight - 180),
      }));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // **Mouse Events**
  const handleMouseDown = (e) => {
    draggingRef.current = true;
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!draggingRef.current || !divRef.current) return;

    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;

    requestAnimationFrame(() => {
      setPosition((prev) => ({
        x: Math.min(Math.max(prev.x + dx, 0), window.innerWidth - 60),
        y: Math.min(Math.max(prev.y + dy, 0), window.innerHeight - 180),
      }));
    });

    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    draggingRef.current = false;
  };

  // **Touch Events (For Mobile)**
  const handleTouchStart = (e) => {
    draggingRef.current = true;
    startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e) => {
    if (!draggingRef.current || !divRef.current) return;

    const dx = e.touches[0].clientX - startPos.current.x;
    const dy = e.touches[0].clientY - startPos.current.y;

    requestAnimationFrame(() => {
      setPosition((prev) => ({
        x: Math.min(Math.max(prev.x + dx, 0), window.innerWidth - 60),
        y: Math.min(Math.max(prev.y + dy, 0), window.innerHeight - 180),
      }));
    });

    startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    draggingRef.current = false;
  };
  
  return (
    <div>
    {
      loading && <div style={{width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem'}}>
        Capturing image, please wait...
      </div>
    }
    <div id="captureArea" >
      {/* <div> */}
      
      <div
        style={{
          padding: "0.3rem 0rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          backgroundColor: 'black'
        }}
      >
        {/* <div
          className="pipecount-date-container"
          style={{
            color: "white",
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2 className="pipe-count">Total Pipes - {count}</h2>
        </div> */}
<h2 className="pipe-count" style={{color: 'white'}}>Total Pipes - {count}</h2>
        {/* <div style={{display: 'flex', flexDirection: 'column', fontSize: '1.3rem', padding: '1rem'}}> */}
        <div
          className="type-wise-count"
          style={{ display: "flex", flexWrap: "wrap", padding: "0.5rem", width: '100%' }}
        >
          {Object.entries(typeCount).map(([pipeType, quantity]) =>
            quantity > 0 ? (
              <span
                className="each-type-count"
                key={pipeType}
                style={{
                  color: "white",
                  backgroundColor:
                    pipeType == 1
                      ? "rgba(146, 85, 11, 0.2)"
                      : pipeType == 2
                      ? "rgba(138, 138, 212, 0.2)"
                      : pipeType == 3
                      ? "rgba(253, 0, 0, 0.28)"
                      : pipeType == 4
                      ? "rgba(0, 253, 13, 0.16)"
                      : "rgba(223, 0, 253, 0.21)",
                  padding: "0.4rem 0.6rem",
                  borderRadius: "8px",
                  border: `1px solid ${
                    pipeType == 1
                      ? "yellow"
                      : pipeType == 2
                      ? "blue"
                      : pipeType == 3
                      ? "red"
                      : pipeType == 4
                      ? "green"
                      : "purple"
                  }`,
                }}
              >
                {pipeType}× pipes: {pipeType} × {quantity} ={" "}
                {pipeType * quantity}
              </span>
            ) : null
          )}
        </div>
        {/* </div> */}

        <span className="capture-date" style={{color: 'lightgrey'}}>
          Date - {new Date("2025-03-06T12:42:31.864629").toLocaleString()}
        </span>
        <div
        ref={divRef}
          id="pipeSizeButton"
          style={{
            display: "flex",
            flexDirection: 'column',
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "3rem",
            height: "18rem",
            position: "fixed",
            // bottom: "6rem",
            // right: "0.4rem",
            left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: "grab",
            zIndex: "999",
            touchAction: "none"

          }}

          onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
        >
          <div
            className="each-pipesizeButton"
            onClick={() => setPipeColor(1)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "orange",
              fontSize: "1.2rem",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            1
          </div>
          <div
            className="each-pipesizeButton"
            onClick={() => setPipeColor(2)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "blue",
              fontSize: "1.2rem",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            2
          </div>
          <div
            className="each-pipesizeButton"
            onClick={() => setPipeColor(3)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "red",
              fontSize: "1.2rem",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            3
          </div>
          <div
            className="each-pipesizeButton"
            onClick={() => setPipeColor(4)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "green",
              fontSize: "1.2rem",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            4
          </div>
          <div
            className="each-pipesizeButton"
            onClick={() => setPipeColor(5)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "purple",
              fontSize: "1.2rem",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            5
          </div>
          <div
            id="captureButton"
            style={{
              backgroundColor: "red",
              height: "2.7rem",
              width: "2.7rem",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={downloadImage}
          >
            <FaCamera />
          </div>
        </div>
      </div>
      <div style={{ position: "relative", width: "100%" }}>

        <img
          id="imageToCapture"
          src={
            "https://alvision-count.s3.ap-south-1.amazonaws.com/count/DrawTest/original/2025/03/original_9a470183-4736-456e-a0ba-436a11dc8825.png"
          } // Your image source
          onError={() => console.error("Image failed to load")}
          // onLoad={() => setImageLoaded(true)}
          // key={uniqueImageUrl}
          ref={imageRef}
          // src={uniqueImageUrl}
          style={{ width: "100%", display: "block" }}
          alt="Pipes"
          onClick={handleImageClick}
          crossOrigin="anonymous"
          
        />
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%" }}>
          {boxes.map((coordinates, index) => {
            cumulativeSum += coordinates[4]; // pipeCount is the 5th element
            return (
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
                // resize={resize}
              />
            );
          })}
        </div>
      </div>
{/* --------------------Table------------------------ */}
<div className="p-4" style={{display: 'flex', justifyContent: 'center', color: 'white', backgroundColor: '#282828', marginTop: '2rem', marginBottom: '1rem'}}>
      <table border={1} className="border-collapse border border-gray-400 w-full" style={{width: '100%', fontSize: '1.1rem' }}>
        <thead  >
          <tr className="bg-gray-200">
            <td colSpan="2" className="border border-gray-400 p-2 text-center align-middle">
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Ford-Motor-Company-Logo.png" 
          alt="alluvium logo" 
          style={{ height: '3.7rem'}} 
        />
      </div>
    </td>
            
            <td className="border border-gray-400 p-2" style={{ backgroundColor: 'lightgrey'}}>Truck Number</td>
            <td className="border border-gray-400 p-2"  style={{backgroundColor: 'lightgrey'}}>MH-01-HJ-1234</td>
          </tr>
        </thead>
        <thead style={{backgroundColor: 'lightgrey'}}>
          <tr className="bg-gray-300">
            <td className="border border-gray-400 p-2" >Client Name</td>
            <td className="border border-gray-400 p-2">Yash Gupta</td>
            <td className="border border-gray-400 p-2">Driver Name</td>
            <td className="border border-gray-400 p-2">Kalpesh</td>
          </tr>
        </thead>
        <thead>
          <tr className="bg-gray-400" style={{backgroundColor: 'lightgrey', fontSize: '1.1rem'}}>
            <td className="border border-gray-400 p-2">Pipe Types</td>
            <td className="border border-gray-400 p-2">Select Size</td>
            <td className="border border-gray-400 p-2">NOS</td>
            <td className="border border-gray-400 p-2">Remarks</td>
          </tr>
        </thead>
        <tbody>

        {Object.entries(initialCounts).map(([pipeType, quantity], index) =>
          quantity > 0 ? (
            <tr key={index}>
            <td className="border border-gray-400 p-2">Type {pipeType}</td>
            <td className="border border-gray-400 p-2">{pipeType} X {quantity}</td>
            <td className="border border-gray-400 p-2">{pipeType*quantity}</td>
            <td className="border border-gray-400 p-2">-</td>
          </tr>
          ): null)}
          
        </tbody>


         <tfoot  style={{backgroundColor: 'lightgrey'}}>
         <tr>
           

            <td colSpan="4" className="border border-gray-400 p-2 text-center align-middle">
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", fontSize: '1.2rem' }}>
      Total Count - {count}
      </div>
    </td>
          </tr>
        </tfoot>
      </table>
    </div>

    {/* --------logo--------- */}
    <div
        style={{
          width: "100%",
          height: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img className="logo" src={logo} alt="alluvium logo" />
      </div>
     
    </div>
    </div>
  );
};

export default App;

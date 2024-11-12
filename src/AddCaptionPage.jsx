import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric'; // v6
import { useNavigate } from 'react-router-dom';
const AddCaptionPage = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const [canvas,setCanvas]=useState(null)

  // const fabricCanvas = useRef(null); 

    useEffect(() => {
   if (canvasRef.current){
      let Canvascurrent = new fabric.Canvas(canvasRef.current);
fabric.Image.fromURL(imageUrl,{ crossOrigin: 'anonymous' }).then((img) => {
  const desiredWidth = 400;
  const desiredHeight = 300; 

  // Resize the image
  img.scaleToWidth(desiredWidth);
  img.scaleToHeight(desiredHeight);
  Canvascurrent.add(img);
  Canvascurrent.centerObject(img);
  Canvascurrent.setActiveObject(img);

});

setCanvas(Canvascurrent)
    // Cleanup function to remove the canvas when component unmounts
    return () => {
      Canvascurrent.dispose();
     
    };}

  }, [imageUrl]); // Rerun when the image changes
    const addText = () => {
      const text = new fabric.Textbox("Your text here", {
        left: 50,
        top: 50,
        fontSize: 24,
        fill: "black",
      });
      canvas.add(text);
    };
  
    const addShape = (shapeType) => {
    if(canvas){
      let shape;
      switch (shapeType) {
        case "circle":
          shape = new fabric.Circle({
            radius: 30,
            fill: "blue",
            left: 100,
            top: 100,
          });
          break;
        case "rectangle":
          shape = new fabric.Rect({
            width: 60,
            height: 40,
            fill: "green",
            left: 150,
            top: 150,
          });
          break;
        case "triangle":
          shape = new fabric.Triangle({
            width: 50,
            height: 50,
            fill: "red",
            left: 200,
            top: 200,
          });
          break;
        default:
          return;
      }
      canvas.add(shape);
    }
    };
  
    const downloadImage = () => {
    
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1,
      });
    
      
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'edited-image.png';
      link.click();
    };
    const removeSelectedObject = () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          canvas.remove(activeObject);
        }
      };
    // Log canvas layers and their attributes
  const logCanvasLayers = () => {
    if (canvas) {
      const layers = canvas.getObjects().map((obj, index) => ({
        layer: index + 1,
        type: obj.type,
        left: obj.left,
        top: obj.top,
        fill: obj.fill,
        angle: obj.angle,
        width: obj.width,
        height: obj.height,
        text: obj.text || null,
      }));
      console.log("Canvas Layers:", layers);
    }
  };
  
  return (<><div>
     <div className="bg-[#48184C] text-white text-center">
        <div className="container mx-auto py-4">
        <h1 className="text-3xl font-bold ">Image Editor</h1></div>

      </div>
      <div className='container mx-auto py-4 text-center underline'>
        <h3 className='font-extrabold text-2xl'> Add Caption Page</h3>
      </div>
    <div className='container mx-auto py-4' >
      <div className='grid grid-cols-2 justify-between items-center'>
    
    <canvas width={'600px'} height={'600px'} style={{border:'1px solid black', position:'absolute'}}  ref={canvasRef} />
    <div className='border border-[#48184C] flex flex-col justify-between h-full'>
      <div className='p-4 justify-start gap-2 flex flex-wrap'>
      <button onClick={addText} className='px-6 py-2 font-bold bg-[#48184C] text-white'>Add Text</button>
      <button onClick={() => addShape("circle")} className='px-6 py-2 font-bold bg-[#48184C] text-white'>Add Circle</button>
      <button onClick={() => addShape("rectangle")} className='px-6 py-2 font-bold bg-[#48184C] text-white'>Add Rectangle</button>
      <button onClick={() => addShape("triangle")} className='px-6 py-2 font-bold bg-[#48184C] text-white'>Add Triangle</button>
      
      <button onClick={removeSelectedObject} className='px-6 py-2 font-bold bg-[#48184C] text-white'>Remove Selected</button>
        <button onClick={logCanvasLayers} className='px-6 py-2 font-bold bg-[#48184C] text-white'>Log Canvas Layers</button>
        </div>
        <div>
        <button onClick={downloadImage} className='px-6 py-2 font-bold bg-[#48184C] text-white w-full'>Download</button>
        </div>
    </div>
  </div></div>
  
  </div></>
  )
}

export default AddCaptionPage
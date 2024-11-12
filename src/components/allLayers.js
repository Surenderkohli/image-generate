import React, { useEffect, useState } from 'react'

const AllLayers = ({canvas}) => {
    const [layers,setLayers]=useState([])
    const[selectedLayer,setSelectedLayer]=useState(null)
     
    const addIdToObject=(object)=>{
        if(!object.id){
            const randomid = Math.floor(1000 + Math.random() * 9000);
            object.id=`${object.type}_${randomid}`
        }
    }
    canvas.prototype.updateZIndices=()=>{
        const objects=this.getObjects();
        objects.forEach((obj, index)=>{
addIdToObject(obj)
obj.zIndex(index)

        })
    }
    const UpdateLayers=()=>{
        if(canvas){
            canvas.updateZIndices()
            const objects=canvas.getObjects()
            .filter((obj)=>
                !(obj.id.startWith('vertical-')|| obj.id.startsWith('horizontal-')
        ))
        .map((obj)=>({
            id:obj.id,
            zIndex:obj.zIndex,
            type:obj.type
        }))
        setLayers([...objects].reverse())
        }
    }

    useEffect(()=>{
        if(canvas){
            canvas.on("object:added", updateLayers);
            canvas.on("object:removed", updateLayers);
            canvas.on("object:modified", updateLayers);
        
            canvas.on("selection:created", handleObjectSelected);
            canvas.on("selection:updated", handleObjectSelected);
            canvas.on("selection:cleared", () => setSelectedLayer(null));
            UpdateLayers();
            return()=>{
                canvas.off("object:added", updateLayers);
                canvas.off("object:removed", updateLayers);
                canvas.off("object:modified", updateLayers);
          
                canvas.off("selection:created", handleObjectSelected);
                canvas.off("selection:updated", handleObjectSelected);
                canvas.off("selection:cleared", () => setSelectedLayer(null));
                


            }
        }

    },[canvas])
    const selectLayerInCanvas = (layerId) => {
        const object = canvas.getObjects().find(obj => obj.id === layerId);
        if (object) {
          canvas.setActiveObject(object);
          canvas.requestRenderAll();
        }
      };
  return (<><div className="layersList CanvasSettings darkmode">
    <ul>
      {layers.map((layer) => (
        <li
          key={layer.id}
          onClick={() => selectLayerInCanvas(layer.id)}
          className={layer.id === selectedLayer ? "selected-layer" : ""}
        >
          {layer.type} (ID: {layer.id})
        </li>
      ))}
    </ul>
  </div></>
    
  )
}

export default AllLayers
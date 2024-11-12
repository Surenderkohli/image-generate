import React, { useState } from "react";
import SearchBar from "./components/searchBar";
import CanvasEditor from "./components/canvasEditor";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCaptionPage from "./AddCaptionPage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle image selection
  const onImageSelect = (image) => {
    setSelectedImage(image); // Updates the state with the selected image
  };
  return (<>
    <ToastContainer position="top-right" autoClose={3000} />
<Router>
      <Routes>
        
        <Route path="/" element={<SearchBar onImageSelect={setSelectedImage} />} />
        <Route path="/add-caption" element={<AddCaptionPage imageUrl={selectedImage} />} />
      </Routes>
    </Router></>
  
  );
}

export default App;

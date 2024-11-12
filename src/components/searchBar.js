import React, { useCallback, useState } from "react";
import { searchImages } from "../services/imageApi";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from "./loader";
const SearchBar = ({ onImageSelect }) => {
    const [query, setQuery] = useState("");
    const [images, setImages] = useState([]);
    const [lastQuery, setLastQuery] = useState("");

    const [isLoading,setIsLoading]=useState(false)
    const [error, setError] = useState(''); // Validation error state
    const navigate = useNavigate();

    const validateQuery = (query) => {
      if (!query.trim()) {
        toast.error("Search query cannot be empty.")
        return "Search query cannot be empty.";
      }
      if (query.trim().length < 3) {
        toast.error("Search query must be at least 3 characters.")
        return "Search query must be at least 3 characters.";
      }
      return "";
    };

    let searchTimeout;
const handleSearch = useCallback((async () => {
  setIsLoading(true); // start loading
    try {
      const results = await searchImages(query);
      setImages(results);
      setLastQuery(query);
    } catch (error) {
      console.log(error)
      
      toast.error("Could not fetch images. Try again later.");
    }
    finally{
      setIsLoading(false); // End loading
    }
  }),
  
)

const throttledApplySearch=useCallback(()=>{
  const validationError = validateQuery(query);
  if (validationError) {
    setError(validationError); // Set error if validation fails
    return
  }
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  searchTimeout = setTimeout(() => {
    handleSearch();
  }, 1000);

},[query])

    const handleImageSelect = (imageUrl) => {
      onImageSelect(imageUrl);
      navigate('/add-caption');
    };
    if(isLoading){
      return<Loader/>
    }
  return (
    <div className="bg-[#e8e8e8] h-screen">
      <div className="bg-[#48184C] text-white text-center">
        <div className="container mx-auto py-4">
        <h1 className="text-3xl font-bold " >Image Editor</h1></div>

      </div>
      
     <div className="bg-[#e8e8e8] container mx-auto ">
      <div className="lg:pt-16">
        <h3 className="text-3xl">Name:Surender Kohli</h3>

        <p className="text-2xl">Email:surenderkohli77@gmail.com</p>
      </div>
<div className=" py-10 md:py-[60px] lg:py-16 text-center">
    <input
    className="px-3 py-[10px] w-[300px]"
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search images..."
    />
     <button onClick={throttledApplySearch} className="px-3 py-[10px] bg-[#48184C] text-white">Search</button>
     <p>Please Search Images </p>
    </div>

    <div className="grid grid-cols-4 gap-4 pb-20">
      {images.map((image) => (
        <div key={image.id} className="bg-white rounded-2xl group  flex-wrap gap-y-5 items-center shadow-xl hover:shadow-[0px_4px_30px_#bcbcbc] overflow-hidden">
          <img src={image.webformatURL} alt={image.tags}  className="h-[245px] w-full"/>
         <div className="text-center group-hover:bg-[#48184C]" >
          <button onClick={() => handleImageSelect(image.webformatURL)} className="px-6 py-2 font-bold w-full group-hover:text-white transition-bg">
              Add Captions 
            </button></div>
        </div>
      ))}
    </div>
    
    </div>
  </div>
  )
}

export default SearchBar
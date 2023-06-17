import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import sadGif from '../images/fed7c66ff997d517d9c63cf20ad4c23f.gif';
import happyGif from '../images/200w.gif';
import "./SearchBar.css";
import axios from 'axios';
export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {

   axios.post('http://localhost:5000',input
  ).then((response) => {

  }).catch((error) => {
    console.log(error);
  });
};

  const handleChange = (value) => {
    setInput(value);

  };

  return (
    <>
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="add url..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button onClick={() => fetchData(input)}>Search</button>
    </div>
    <img src={sadGif} alt="my-gif" className="rounded gif"/>
</>
  );
};
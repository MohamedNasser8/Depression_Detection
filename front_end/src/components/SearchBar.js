import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import sadGif from "../images/fed7c66ff997d517d9c63cf20ad4c23f.gif";
//import happyGif from '../images/200w.gif';
import "./SearchBar.css";
import axios from "axios";
export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [inputs,setInputs] = useState({});
  const fetchData = () => {
    // console.log(inputs)
    // axios
    //   .post("http://localhost:80/getStatsSingle", input)
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });



    axios.post('http://localhost:80/getStatsSingle',inputs).then(function (response) {
      console.log(response.data);
    });
  };

  // const handleChange = (value) => {
  //   setInput(value);
  // };

  const handleChange = (event) => {
    const name = "link"
    const value = event.target.value;       
    setInputs(values => ({...values,[name]: value}));
}

  return (
    <>
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          placeholder="add url..."
          name = "link"
          onChange={handleChange}
        />
        <button onClick={() => fetchData(input)}>Search</button>
      </div>
      <img src={sadGif} alt="my-gif" className="rounded gif" />
    </>
  );
};

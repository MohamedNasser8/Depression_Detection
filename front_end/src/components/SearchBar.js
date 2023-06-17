import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import sadGif from "../images/fed7c66ff997d517d9c63cf20ad4c23f.gif";
//import happyGif from '../images/200w.gif';
import "./SearchBar.css";
import axios from "axios";
export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [status,setStatus] = useState("")
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
      let score=0;
      let Data=response.data;
      for(let i=0;i<Data.length;i++){
        score=score+Data[i][0][0]['score'].score;
      }
      score=score/Data.length;
      if(score<0.4){
        setStatus("You are Happy")
      }
      else if(score<0.7){
      setStatus("You are likely to be depressed")
      }
      else{
        setStatus("You are depressed")
      }
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
        <button className="searchBtn" onClick={() => fetchData(input)}>Search</button>
      </div>
      <div>
        <h4>{status}</h4>
      </div>
      <img src={sadGif} alt="my-gif" className="rounded gif" />
    </>
  );
};

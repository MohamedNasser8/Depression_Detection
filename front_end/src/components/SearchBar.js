import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import ApexChart from "../components/hexagonalChart/ApexChart";
import sadGif from "../images/fed7c66ff997d517d9c63cf20ad4c23f.gif";
import "./Spinner.css";
import happyGif from '../images/200w.gif';
import "./SearchBar.css";
import axios from "axios";
export const SearchBar = ({ setResults}) => {

  var da="";
  var fl="";
  var pa="";
  var sd="";
  var su="";
  var wd="";


  const [input, setInput] = useState("");
  const [status,setStatus] = useState("")
  const [inputs,setInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [displayChart, setDisplayChart] = useState(false);
  const fetchData = () => {
    setIsLoading(true);
    axios.post('http://localhost:80/getStatsSingle',inputs).then(function (response) {
      console.log(response.data);
      setIsLoading(false);
      let score=0;
      let Data=response.data;
      Data=Data.split('');
      // D
      let len=0;
      for(let i=0;i<Data.length;i++){
        if(Data[i]=='n'&& Data[i+1]=='o')
        {
          len++;
          let num="";
          let cnt=0;
          for(let j=i+9;j<Data.length;j++){
            if(Data[j]=='0'||cnt>0){
              num+=Data[j];
              if(cnt<2){
                da+=Data[j];  
              }
              else if(cnt<4){
                fl+=Data[j];
              }
              else if(cnt<6){
                pa+=Data[j];
              }
              else if(cnt<8){
                sd+=Data[j];
              }
              else if(cnt<10){
                su+=Data[j];
              }
              else if(cnt<12){
                wd+=Data[j];
              }
              cnt++;
            }
            if(cnt==12)
            break;
          }
          score+=1-parseFloat(num);
        }
      }
      console.log('score');
      console.log(score);
      score=score/len;
      if(score<0.11){
        setStatus("He is Happy")
      }
      else if(score<0.2){
      setStatus("He is likely to be depressed")
      }
      else{
        setStatus("He is depressed")
      }
    });
  };

  const handleChange = (event) => {
    const name = "link"
    const value = event.target.value;       
    setInputs(values => ({...values,[name]: value}));
}

  return (
    <>
      {isLoading && <div className="spinner"></div>}
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          placeholder="add url..."
          name = "link"
          onChange={handleChange}
        />
        <button className="searchBtn" onClick={() => fetchData(input)}>Search</button>
      </div>
      <div className="mt-4 d-flex">
        <h4>{status}</h4>
      </div>

      {
        status !=""?
        <img src={status=="He is Happy"?happyGif:sadGif}alt="my-gif" className="rounded gif d-flex justify-content-center " />:<></>
      }
      {status=="He is depressed"||status=="He is likely to be depressed"?
        <button className="searchBtn mt-4" onClick={() => setDisplayChart(true)}>Display Chart</button>:
        <></>
      }
      
      {displayChart?(
        
          <>
        <ApexChart da="" fl="" pa="" sd="" su="" wd=""/>
        <button className="searchBtn" onClick={() => setDisplayChart(false)}>Close Chart</button>
        </>
      ):
      <></>}
    </>
  );
};
import './App.css';
import { SearchBar } from './components/SearchBar';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
  <div>
    <Header/>
    <div className='search-bar-container'>
    
    <SearchBar/>

    </div>
    <Footer/>
  </div>
  );
}

export default App;
import './App.css';
import Navbar from './components/navbar';
import CreateNFT from './components/createNFT';
import HomePg from './components/home';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div>
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed&display=swap" rel="stylesheet" /> 
    </head>
    <Router>
    <div className="App">
     <Navbar />   
    <div className="container">
     <Routes>
      <Route path="/" element={<HomePg />} />
      <Route path="/create" element={<CreateNFT />} />
     </Routes>
    </div>
    </div>
    </Router>
    </div>
  );
}

export default App;

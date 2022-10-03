import './App.css';
import Navbar from './components/navbar';
import CreateNFT from './components/createNFT';
import HomePg from './components/home';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
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
  );
}

export default App;

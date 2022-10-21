import "./App.css";
import { Routes as Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateNFTPage from "./pages/CreateNftPage";
import ExplorePage from "./pages/ExplorePage";
import YourNFTsPage from "./pages/YourNFTsPage";
import ReselLNFTsPage from "./pages/ReselLNFTsPage";

function App() {

  return (
    <>
    <Switch>
        <Route path="/" element={<HomePage />} />
        <Route exact path="/explore" element={<ExplorePage />} />
        <Route path="/create" element={<CreateNFTPage />} />
        <Route path="/resell" element={<ReselLNFTsPage />} />        
        <Route path="/yourNFTs" element={<YourNFTsPage />} />
    </Switch>
    </>
  );
}

export default App;

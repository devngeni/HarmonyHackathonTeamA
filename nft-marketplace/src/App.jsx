import "./App.css";
import { Routes as Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateNFTPage from "./pages/CreateNftPage";
import ExplorePage from "./pages/ExplorePage";

function App() {

  return (
    <>
    <Switch>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/create" element={<CreateNFTPage />} />
    </Switch>
    </>
  );
}

export default App;

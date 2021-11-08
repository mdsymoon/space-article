import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home/Home";
import SelectedArticle from "./page/SelectedArticle/SelectedArticle";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<SelectedArticle />} />
      </Routes>
    </Router>
  );
}

export default App;

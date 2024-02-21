import FileUpload from "./components/FileUpload";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Results from "./components/Results";
import About from "./components/About";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FileUpload />} />
        <Route path="/results" element={<Results />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

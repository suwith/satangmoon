import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <div className="w-full max-w-[428px] sm:max-w-[540px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] mx-auto min-h-screen bg-main bg-cover">
        <div>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

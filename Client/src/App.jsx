import "./App.css";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeroSection from "./components/home/heroSection";
import FeaturedJobs from "./components/home/featuredJobs";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <HeroSection />
        <FeaturedJobs/>
        <Routes>
          <Route
            path="/home"
            element={
              <>
                
              </>
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

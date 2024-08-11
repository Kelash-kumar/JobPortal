import "./App.css";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Jobs from './components/job/Job';
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Home />
        <Routes>
          <Route path="/home" element={<></>} />
          <Route path="/jobs" element={<Jobs/>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

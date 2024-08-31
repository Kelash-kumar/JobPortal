import "./App.css";
import Jobs from "./components/Job";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Browse from "./components/browse";
import Profile from "./components/profile";
import { useSelector } from "react-redux";
// import UpdateProfile from "./components/updateProfile";
import JobDescription from "./components/jobDescription";
import Companies from "./components/admin/companies";
import RegisterCompany from "./components/admin/RegisterCompany";
import CompanyForm from "./components/admin/CompanyForm";
function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/browse" element={<Browse />} />
          {user && (
            <>
              <Route path="user/profile" element={<Profile />} />
              {/* <Route path="user/profile/update" element={<UpdateProfile />} /> */}
              <Route path="/:id" element={<JobDescription />} />
              <Route path="/admin/companies" element={<Companies/>}/>
              <Route path="/admin/companies/register" element={<RegisterCompany/>}/>
              <Route path="/admin/companies/:id" element={<CompanyForm/>}/>
            </>
          )}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
           <Route path="*" element={<div>Page Not Fount 404</div>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;

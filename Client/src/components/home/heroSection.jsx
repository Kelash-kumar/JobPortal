import "./HeroSection.css"; // Import the CSS file
import { CiSearch } from "react-icons/ci";
// import JobCategories from "./jobCategories";

const HeroSection = () => {
  return (
    <div>
      <div className="hero-container">
        <div className="hero-content">
          <span className="headline">No.1 Job Hunt</span>
          <h1>Search apply &</h1>
          <h1>
            Get Your <span>Dream Job</span>
          </h1>
          <p>Explore thousands of job opportunities at top companies</p>
          <div className="search for here">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="get your job"
            />
            <span className="search_icon">
              {" "}
              <CiSearch />
            </span>
          </div>
        </div>
      </div>
      {/* <JobCategories/> */}
    </div>
  );
};

export default HeroSection;

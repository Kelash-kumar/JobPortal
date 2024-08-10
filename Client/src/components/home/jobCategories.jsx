import { useState } from 'react';
import './jobCategories.css'; // Import the CSS file
import { FaArrowLeft ,FaArrowRight} from "react-icons/fa";
const JobCategories = () => {
  const jobCategories = [
    "Backend Developer",
    "Frontend Developer",
    "UI/UX Designer",
    "Data Science Engineer",
    "DevOps Engineer",
    "Product Manager",
    "Digital Marketer",
    "Business Analyst",
    "Block Chain Developer",
    "Flutter Developer",
  ];

  const itemsToShow = 3; 
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCategory = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + itemsToShow) % jobCategories.length
    );
  };

  const prevCategory = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - itemsToShow + jobCategories.length) % jobCategories.length
    );
  };

  const visibleCategories = jobCategories.slice(
    currentIndex,
    currentIndex + itemsToShow
  );

  return (
    <div className="carousel_container">
      <button className="prev" onClick={prevCategory}>
      <FaArrowLeft/>
      </button>
      <div className="carousel_wrapper">
        {visibleCategories.map((category, index) => (
          <div key={index} className="carousel_item">
            {category}
          </div>
        ))}
      </div>
      <button className="next" onClick={nextCategory}>
       <FaArrowRight/>
      </button>
    </div>
  );
};

export default JobCategories;

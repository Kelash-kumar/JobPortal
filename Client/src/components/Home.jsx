
import HeroSection from './heroSection';
import FeatureJobs from './featuredJobs';
import JobCategories from './jobCategories';
import Footer from './Footer';
import getAllJobs from './hooks/getAllJobs';
import { useSelector } from 'react-redux';


const Home = () => {
  getAllJobs();
  const {allJobs} = useSelector(state => state.jobs);

  return (
    <div>
  <HeroSection/>    
  <JobCategories/>
  <FeatureJobs
  jobs ={allJobs}
  />  
  <Footer/>
    </div>
  )
}

export default Home

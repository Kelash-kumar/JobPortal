
import HeroSection from './heroSection';
import FeatureJobs from './featuredJobs';
import JobCategories from './jobCategories';
import Footer from './Footer';
// import getAllJobs from './hooks/getAllJobs';



const Home = () => {
  // getAllJobs()
  return (
    <div>
  <HeroSection/>    
  <JobCategories/>
  <FeatureJobs/>  
  <Footer/>
    </div>
  )
}

export default Home

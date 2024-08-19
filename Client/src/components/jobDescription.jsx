import {useParams} from 'react-router-dom';
import './styles/jobDescription.css';
const jobDescription = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {id} = useParams();
    console.log(id);
    
  return (
    <div className='job_Description_container'>
        <div className='job_Description_container_Top'>
            <div className='Top_Heading'>
              <h1>Frontend Developer</h1>
              <div className='top_details'>
                <span>12 LPA</span>
                <span>part time</span>
                <span>10 opening</span>
              </div>  
            </div>
        <button
        className='top_btn'
        >Apply</button>
        </div>
        <h1 className='job-desc-title'>Job Description</h1>
        <div>
            <h1 className='job-desc-value'>Role:<span>frontend developer</span></h1>
            <h1 className='job-desc-value'>Location:<span>pakistan</span></h1>
            <h1 className='job-desc-value'>Description:<span>This is job for frontend developer.</span></h1>
            <h1 className='job-desc-value'>Experience:<span>3+years</span></h1>
            <h1 className='job-desc-value'>Salary:<span>20M per month</span></h1>
            <h1 className='job-desc-value'>Total Applicants:<span>20</span></h1>
            <h1 className='job-desc-value'>Posted Date:<span>12/06/1224</span></h1>
        </div>
    </div>
  )
}

export default jobDescription
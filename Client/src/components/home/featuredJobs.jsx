import './featuredJobs.css'; // Import the CSS file

const FeaturedJobs = () => {
    const jobs = [
        {
            title: 'Frontend Developer',
            company: 'Tech Corp',
            description:"This phrase can also mean being right up against the line between two different things. If your short story toes the line between fantasy and science fiction",
            location: 'New York, NY',
            type: 'Full-time',
            position:"2",
            salary:"20"
        },
        {
            title: 'Backend Developer',
            description:"This phrase can also mean being right up against the line between two different things. If your short story toes the line between fantasy and science fiction",
            company: 'Innovatech',
            location: 'San Francisco, CA',
            type: 'Remote',
             position:"2",
            salary:"20"
        },
        {
            title: 'UI/UX Designer',
            description:"This phrase can also mean being right up against the line between two different things. If your short story toes the line between fantasy and science fiction",
            company: 'Creative Labs',
            location: 'Austin, TX',
            type: 'Part-time',
             position:"2",
            salary:"20"
        },
    ];

    return (
        <div className="featured-container">
            <h2 className="featured-title">Latest and Top Jobs Openinig</h2>
            <div className="featured-jobs">
                {jobs.map((job, index) => (
                    <div key={index} className="job-card">
                        <h4>{job.company}</h4>
                        <p>{job.location}</p>
                        <h3>{job.title}</h3>
                        <p>{job.description}</p>
                        <div className='job_categories'>
                            <span className='job_position'>{`${job.position} postion`}</span>
                        <span className="job_type">{job.type}</span>
                        <span className="job_salary">{`${job.salary} LPA`}</span>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedJobs;

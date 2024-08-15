import './styles/Experience.css';

const Experience = () => {

    const experiences = [
        {
          title: 'Frontend Developer',
          company: 'Tech Solutions Ltd.',
          duration: 'Mar 2021 - Present',
          description: 'Developed and maintained user interfaces for various web applications using React and Vue.js. Collaborated with UX designers to improve user experience, resulting in a 15% increase in user engagement.'
        },
        {
          title: 'Backend Developer',
          company: 'Innovative Systems',
          duration: 'Jan 2019 - Feb 2021',
          description: 'Built and maintained RESTful APIs using Node.js and Express. Integrated third-party services and ensured secure data handling, leading to a 25% improvement in system performance.'
        }]


  return (
    <div className="experience-section">
      <h2 className="experience-title">Experience</h2>
      {experiences.map((experience, index) => (
        <div key={index} className="experience-item">
          <h3 className="job-title">{experience.title}</h3>
          <div className="company-duration">
            <span className="company-name">{experience.company}</span>
            <span className="job-duration">{experience.duration}</span>
          </div>
          <p className="job-description">{experience.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Experience;

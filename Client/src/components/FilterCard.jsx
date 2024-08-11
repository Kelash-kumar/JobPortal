// css lies in job.css

const filtter_jobs = [
  {
    type: "Location",
    Area: ["New York", "San Francisco", "Chicago"],
  },
  {
    type: "Industry",
    Area: ["Tech", "Finance", "Healthcare"],
  },
  {
    type: "Salary",
    Area: ["0-20k", "20k-40k", "40k-60k"],
  },
];

const FilterCard = () => {
  return (
    <div>
      <h4>Filtters</h4>
      {filtter_jobs.map((item, index) => (
        <div key={index} className="filter-item">
          <label>{item.type}</label>
          {item.Area.map((options, ind) => (
            <div key={ind}>
              <input
                type="radio"
                id={`${item.type}-${options}`}
                name="options"
                value={options}
              />
              <label htmlFor={`${item.type}-${options}`}>{options}</label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;

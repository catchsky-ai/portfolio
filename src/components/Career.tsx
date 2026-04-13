import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Big Data Engineer</h4>
                <h5>Reliance Jio</h5>
              </div>
              <h3>2017-2019</h3>
            </div>
            <p>
              Designed ETL workflows for IPL content personalization and AdTech using Hive on Hadoop.
              Built user profiling pipelines supporting 100M+ subscriber base for targeted content delivery.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Consultant (Data Engineer)</h4>
                <h5>Wipro Limited</h5>
              </div>
              <h3>2021-2022</h3>
            </div>
            <p>
              Automated AUSTRAC regulatory reporting using Spark SQL and Airflow on AWS. Implemented ML-enhanced
              data quality validation achieving 90% reduction in manual processing and 99.8% accuracy across 50K+ monthly compliance events.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Technical Business Analyst</h4>
                <h5>Gratex International</h5>
              </div>
              <h3>2022-2023</h3>
            </div>
            <p>
              Managed requirements analysis and solution design for Microsoft UPM+ insurance underwriting platform
              serving AU/NZ markets. Maintained 95% SLA adherence across BAU activities and regulatory changes.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Consultant</h4>
                <h5>News Corp Australia</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Architecting AI-powered Finance Analytics Platform using LookML semantic modeling on BigQuery.
              Built Common Data Layer enabling conversational analytics and natural language querying, achieving
              70% reduction in reporting complexity across 10+ mastheads.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

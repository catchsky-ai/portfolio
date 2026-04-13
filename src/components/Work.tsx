import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { useState } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const achievements = [
  {
    id: 1,
    title: "AI-Powered Conversational Analytics Platform",
    category: "Conversational Intelligence & NLP",
    description: "Designed and implemented conversational analytics interface enabling natural language querying of revenue metrics. Finance teams can now ask questions like 'What was our churn rate in Q4?' and get instant AI-powered insights, replacing 5+ legacy dashboards with intelligent voice-driven analytics.",
    tech: "Conversational Analytics, NLP, LookML, BigQuery, AI",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  },
  {
    id: 2,
    title: "Semantic CDL for Conversational Insights",
    category: "Semantic Modeling + CA Integration",
    description: "Built Common Data Layer (CDL) with LookML semantic modeling specifically designed for conversational analytics. Centralized cancellation, churn, and acquisition logic enabling executives to query unified data using natural language, achieving 70% reduction in reporting complexity.",
    tech: "LookML, BigQuery, Semantic Layer, Conversational AI, CDL",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80",
  },
  {
    id: 3,
    title: "End-to-End ML Automation Solutions",
    category: "Intelligent Automation",
    description: "Delivered 3 end-to-end automation solutions reducing manual processing by 80%+ across finance and compliance domains. Implemented ML-enhanced validation, anomaly detection, and intelligent workflows processing 50K+ events monthly with 99.8% accuracy.",
    tech: "Spark SQL, Airflow, AWS, ML Validation, Python, Anomaly Detection",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
  },
  {
    id: 4,
    title: "Enterprise Data Pipelines at Scale",
    category: "Big Data Engineering",
    description: "Architected scalable data pipelines supporting AI-driven insights for 100K+ daily users across media and telecom sectors. Built real-time processing infrastructure with Airflow orchestration on GCP, enabling predictive analytics and behavioral segmentation.",
    tech: "Airflow, BigQuery, GCP, Spark, Real-time Processing, Hive",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === achievements.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? achievements.length - 1 : prevIndex - 1
    );
  };

  const getSlideClass = (index: number) => {
    if (index === currentIndex) return "work-box active";
    if (index === (currentIndex + 1) % achievements.length) return "work-box next";
    if (index === (currentIndex - 1 + achievements.length) % achievements.length) return "work-box prev";
    return "work-box hidden";
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Key <span>Achievements</span>
        </h2>

        <div className="carousel-container">
          <button className="carousel-btn prev-btn" onClick={prevSlide} aria-label="Previous">
            <MdArrowBack />
          </button>

          <div className="work-carousel">
            {achievements.map((achievement, index) => (
              <div className={getSlideClass(index)} key={achievement.id}>
                <div className="work-info">
                  <div className="work-title">
                    <h3>0{achievement.id}</h3>
                    <div>
                      <h4>{achievement.title}</h4>
                      <p>{achievement.category}</p>
                    </div>
                  </div>
                  <p className="achievement-desc">{achievement.description}</p>
                  <h4>Technologies</h4>
                  <p>{achievement.tech}</p>
                </div>
                <WorkImage image={achievement.image} alt={achievement.title} />
              </div>
            ))}
          </div>

          <button className="carousel-btn next-btn" onClick={nextSlide} aria-label="Next">
            <MdArrowForward />
          </button>
        </div>

        <div className="carousel-dots">
          {achievements.map((_, index) => (
            <span
              key={index}
              className={currentIndex === index ? "dot active" : "dot"}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;

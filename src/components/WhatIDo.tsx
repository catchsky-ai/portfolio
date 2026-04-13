import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>DATA ENGINEERING</h3>
              <h4>Build Scalable Data Pipelines</h4>
              <p>
                Architect and implement enterprise-scale data pipelines using modern cloud platforms.
                Specialize in real-time processing, ETL/ELT workflows, and semantic data modeling.
              </p>
              <h5>Tech Stack</h5>
              <div className="what-content-flex">
                <div className="what-tags">BigQuery</div>
                <div className="what-tags">Spark</div>
                <div className="what-tags">Airflow</div>
                <div className="what-tags">AWS</div>
                <div className="what-tags">GCP</div>
                <div className="what-tags">Python</div>
                <div className="what-tags">SQL</div>
                <div className="what-tags">LookML</div>
                <div className="what-tags">Hive</div>
                <div className="what-tags">Databricks</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>AI & DATA SCIENCE</h3>
              <h4>ML-Powered Analytics & AI Integration</h4>
              <p>
                Build AI-driven analytics platforms, conversational intelligence systems, and semantic models.
                Expertise in ML automation, NLP, and modern AI tool integration.
              </p>
              <h5>AI Tools & Frameworks</h5>
              <div className="what-content-flex">
                <div className="what-tags">TensorFlow</div>
                <div className="what-tags">Scikit-learn</div>
                <div className="what-tags">Keras</div>
                <div className="what-tags">Claude AI</div>
                <div className="what-tags">ChatGPT API</div>
                <div className="what-tags">LangChain</div>
                <div className="what-tags">RAG Systems</div>
                <div className="what-tags">GitHub Copilot</div>
                <div className="what-tags">Looker</div>
                <div className="what-tags">Power BI</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}

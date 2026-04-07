import styles from './Homepage.module.css'
import {Link} from "react-router-dom";

import Footer from './components/FooterComponent/Footer';
import {tools, Tags} from './tools/tools.config';

function Homepage() {
  return (
    <div className={styles.homepageContainer}>
      <div className={styles.heroSection}>
        <h1>React ToolBox</h1>
        <span>Una selezione di strumenti essenziali pensati per aiutarti a concentrarti e <br/> dare spazio alla creatività. Ogni tool vive in un contesto pulito e <br/> silenzioso, perché ciò che conta è solo il tuo lavoro. <br/> 
        E soprattutto senza abbonamento...
        </span>
      </div>

      <div className={styles.componentCardContainer}>
        {tools.map((tool)=>
          <div  key={tool.id} className={styles.cardContainer}>
            <div className={styles.imageContainer}>
              <Link to={tool.routerPath}>
                <img src={tool.image} className={styles.image}/>
              </Link> 
            </div>

            
            <div className={styles.mainContainer}>
              <div className={styles.tagsContainer}>
                {tool.tags.map((tag)=>
                  <div className={styles.tagFrame} key={tag}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="8" height="8" rx="4" fill={Tags[tag]}/>
                    </svg>
                    <div style={{ color: Tags[tag] }}>{tag}</div>
                  </div>
                )}
              </div>
              
              <h1>{tool.title}</h1>

              <span className={styles.description}>{tool.description}</span>

              <div  className={styles.buttonLinkFrame}> 
                <Link to={tool.routerPath}><button className={styles.buttonLink}>Vai al Tool</button>
                </Link>
              </div>
            </div>
            
          </div>
         )}
      </div>
      <Footer/>
    </div>
    
  )
}

export default Homepage

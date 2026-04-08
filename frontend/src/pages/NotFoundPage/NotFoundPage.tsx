import Header from '../../components/HeaderComponent/Header'
import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'
import Footer from '../../components/FooterComponent/Footer'

import errorImage from '../../assets/NotFoundPageImageError.avif'

import { motion } from 'framer-motion'

function NotFoundPage(){

    return(
        <div className="body_container">
            <Header title="Not Found Page"/>
            <motion.div
                initial={{ x: -100, opacity: 0 }}   // stato iniziale
                animate={{ x: 0, opacity: 1 }}       // stato finale
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className={styles.notFoundContainer}>
                    <img src={errorImage} alt="Error 404" className={styles.errorImage}/>
                    <span className={styles.errorMessage}>THE REQUESTED URL WAS <br/><span className={styles.highlight}>NOT FOUND </span> ON THIS SERVER</span>
                    
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <button className={styles.homepageBtn}>
                            <svg width="14" height="14" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.67592 4.81247L4.99868 8.13523L4.37498 8.74996L0 4.37498L4.37498 0L4.99868 0.614729L1.67592 3.93749H8.74996V4.81247H1.67592V4.81247" fill="#9F9D9D"/>
                            </svg>
                            Go Back
                        </button>
                    </Link>
                </div>
            </motion.div>
            <Footer/>
        </div>
    )
}

export default NotFoundPage
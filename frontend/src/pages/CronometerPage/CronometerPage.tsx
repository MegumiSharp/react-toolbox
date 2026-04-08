import Cronometer from "../../components/CronometerComponent/Cronometer";
import Header from "../../components/HeaderComponent/Header";
import Footer from "../../components/FooterComponent/Footer";

import { motion } from 'framer-motion'

function CronometerPage(){
    return(
        <div className="body_container">
            <Header title="Cronometro"/>
            <motion.div
                initial={{ y: -100, opacity: 0 }}   // stato iniziale
                animate={{ y: 0, opacity: 1 }}       // stato finale
                transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}
            >
                <Cronometer/>
            </motion.div>
            <Footer/>
        </div>
    )
}

export default CronometerPage
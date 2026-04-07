import Cronometer from "../../components/CronometerComponent/Cronometer";
import Header from "../../components/HeaderComponent/Header";
import Footer from "../../components/FooterComponent/Footer";

function CronometerPage(){
    return(
        <div className="body_container">
            <Header title="Cronometro"/>
            <Cronometer/>
            <Footer/>
        </div>
    )
}

export default CronometerPage
import styles from "./Header.module.css"
import { Link } from "react-router-dom"


type HeaderProps = {
    title: string;
};

function Header({ title }: HeaderProps){

    return(
        <header className={styles.header}>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <button className={styles.homepageBtn}>
                    <svg width="14" height="14" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.67592 4.81247L4.99868 8.13523L4.37498 8.74996L0 4.37498L4.37498 0L4.99868 0.614729L1.67592 3.93749H8.74996V4.81247H1.67592V4.81247" fill="#9F9D9D"/>
                    </svg>
                    HomePage
                </button>
            </Link>
            <div className={styles.titleOptionContainer}>
            <h2 className={styles.headerTitle}>{title} -</h2>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>cogwheel</title>
                <g fill="#F7F7F7" strokeLinejoin="miter" strokeLinecap="butt">
                    <circle cx="12" cy="12" r="3" fill="none" stroke="#F7F7F7" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2">
                    </circle>
                    <path d="m22,13.25v-2.5l-2.318-.966c-.167-.581-.395-1.135-.682-1.654l.954-2.318-1.768-1.768-2.318.954c-.518-.287-1.073-.515-1.654-.682l-.966-2.318h-2.5l-.966,2.318c-.581.167-1.135.395-1.654.682l-2.318-.954-1.768,1.768.954,2.318c-.287.518-.515,1.073-.682,1.654l-2.318.966v2.5l2.318.966c.167.581.395,1.135.682,1.654l-.954,2.318,1.768,1.768,2.318-.954c.518.287,1.073.515,1.654.682l.966,2.318h2.5l.966-2.318c.581-.167,1.135-.395,1.654-.682l2.318.954,1.768-1.768-.954-2.318c.287-.518.515-1.073.682-1.654l2.318-.966Z" fill="none" stroke="#F7F7F7" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2">
                    </path>
                </g>
            </svg>
            </div>

        </header>
    )

}
export default Header
import styles from './Footer.module.css'

function Footer(){

    return (
        <div className={styles.footer}>
            <div className={styles.links_container}>
                <div className={styles.link}>
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.5 7L0 3.5L3.5 0L4.33125 0.83125L1.64792 3.51458L4.31667 6.18333L3.5 7V7M8.16667 7L7.33542 6.16875L10.0188 3.48542L7.35 0.816667L8.16667 0L11.6667 3.5L8.16667 7V7" fill="#ACABAA"/>
                    </svg>

                    <a href='https://github.com/MegumiSharp' target="_blank" rel="noopener noreferrer">GITHUB</a>
                </div>
                <p className={styles.copyright}>© {new Date().getFullYear()} | ENSELMI GAETANO SIMONE</p>
                <div className={styles.link}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 32 32"><title>linkedin</title><g fill="#ACABAA"><path d="M26.111,3H5.889c-1.595,0-2.889,1.293-2.889,2.889V26.111c0,1.595,1.293,2.889,2.889,2.889H26.111c1.595,0,2.889-1.293,2.889-2.889V5.889c0-1.595-1.293-2.889-2.889-2.889ZM10.861,25.389h-3.877V12.87h3.877v12.519Zm-1.957-14.158c-1.267,0-2.293-1.034-2.293-2.31s1.026-2.31,2.293-2.31,2.292,1.034,2.292,2.31-1.026,2.31-2.292,2.31Zm16.485,14.158h-3.858v-6.571c0-1.802-.685-2.809-2.111-2.809-1.551,0-2.362,1.048-2.362,2.809v6.571h-3.718V12.87h3.718v1.686s1.118-2.069,3.775-2.069,4.556,1.621,4.556,4.975v7.926Z" fillRule="evenodd"></path></g></svg>

                    <a href='https://www.linkedin.com/in/simoneenselmi/' target="_blank" rel="noopener noreferrer">LINKEDIN</a>
                </div>
            </div>
        </div>
    )
}

export default Footer
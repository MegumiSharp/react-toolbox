import styles from "./Header.module.css"
import { Link } from "react-router-dom"

import Swal from 'sweetalert2'


type HeaderProps = {
    title: string;
};

const pageStorageKeys : Record<string, string> = {
    'To-Do List Tool':  'taskList',
    'Cronometro': 'cronometer',
    'Color Picker Tool': 'savedColors',
}

function Header({ title }: HeaderProps){

    const handleClearLocalStorage = async ()=>{
    
        const result = await Swal.fire({
            title: 'Clear page data?',
            text: `All saved data for "${title}" will be permanently deleted.`,
            icon: 'warning',
            theme: 'dark',
            draggable: true,
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonText: 'Yes, clear it',
            cancelButtonText: 'Cancel',
        })

        if (!result.isConfirmed) return

        localStorage.removeItem(pageStorageKeys[title])

        window.location.reload()
    }

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

                <button className={styles.clearLocalStorageBtn} onClick={handleClearLocalStorage}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                        <title>cookie</title><g fill="#F7F7F7"><circle cx="12.25" cy="1.75" r=".75" fill="#F7F7F7"></circle><circle cx="14.75" cy="4.25" r=".75" fill="#F7F7F7"></circle><path d="M16.87,7.599c-.039-.222-.176-.415-.373-.524-.197-.109-.433-.125-.642-.042-.363,.144-.735,.217-1.105,.217-1.498,0-2.77-1.128-2.958-2.624-.051-.403-.409-.688-.818-.652l-.224,.026c-1.209,0-2.193-.951-2.239-2.165-.008-.216-.109-.418-.277-.554-.168-.137-.386-.193-.6-.157C3.79,1.788,1,5.1,1,9c0,4.411,3.589,8,8,8s8-3.589,8-8c0-.451-.042-.909-.13-1.401Zm-9.87-1.599c.552,0,1,.448,1,1s-.448,1-1,1-1-.448-1-1,.448-1,1-1Zm.25,6.5c-.69,0-1.25-.56-1.25-1.25s.56-1.25,1.25-1.25,1.25,.56,1.25,1.25-.56,1.25-1.25,1.25Zm4,0c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75,.75,.336,.75,.75-.336,.75-.75,.75Z" fill="#F7F7F7"></path></g>
                    </svg>
                </button>
            </div>

        </header>
    )

}
export default Header
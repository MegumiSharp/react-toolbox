import { useEffect, useRef, useState } from 'react'
import styles from './Cronometer.module.css'
import NumberFlow from '@number-flow/react'

function Pomodoro(){

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const intervalIdRef = useRef(0);
    const startTimeRef = useRef(0);

    const hours = Math.floor(elapsedTime / (1000 * 60 * 60) % 60);
    const minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    const seconds = Math.floor(elapsedTime / 1000 % 60 );

    const colorSession = isRunning ? '#3D4C41' : '#D2715D';

    useEffect(()=>{

        if (!isRunning) return clearInterval(intervalIdRef.current);
       
        intervalIdRef.current = setInterval(()=>{
                setElapsedTime(Date.now() - startTimeRef.current);
        }, 10)

    },[isRunning]);

    const start = () =>{
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    const stop = ()=>{
        setIsRunning(false)
    }

    const reset = ()=>{
        setElapsedTime(0);
        setIsRunning(false);
    }

    return(
        <div className={styles.main_container}>
            <div className={styles.stopwatch_container}>
                <div className={styles.title}>
                    <svg style={{color: colorSession}} width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="8" height="8" rx="4" fill= "currentColor" />
                    </svg>
                    <span>SESSION {isRunning ? 'ACTIVE' : 'NOT ACTIVE'}</span>
                </div>
                <div className={styles.stopwatch}>
                    <NumberFlow value={hours} format={{minimumIntegerDigits: 2}}/>:
                    <NumberFlow value={minutes} format={{minimumIntegerDigits: 2}}/>:
                    <NumberFlow value={seconds} format={{minimumIntegerDigits: 2}}/>
                </div>
                <div className={styles.controls_container}>
                    <button onClick={start} className={styles.start}>
                        <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 14V0L11 7L0 14Z" fill="#A8BDAE"/>
                        </svg>
                        START
                    </button>
                    <button onClick={stop} className={styles.stop}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 12V0H12V12H0Z" fill="#BD9A94"/>
                        </svg>
                        STOP
                    </button>
                    <button onClick={reset} className={styles.reset}>
                        <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 21C7.75 21 6.57917 20.7625 5.4875 20.2875C4.39583 19.8125 3.44583 19.1708 2.6375 18.3625C1.82917 17.5542 1.1875 16.6042 0.7125 15.5125C0.2375 14.4208 0 13.25 0 12H2C2 13.95 2.67917 15.6042 4.0375 16.9625C5.39583 18.3208 7.05 19 9 19C10.95 19 12.6042 18.3208 13.9625 16.9625C15.3208 15.6042 16 13.95 16 12C16 10.05 15.3208 8.39583 13.9625 7.0375C12.6042 5.67917 10.95 5 9 5H8.85L10.4 6.55L9 8L5 4L9 0L10.4 1.45L8.85 3H9C10.25 3 11.4208 3.2375 12.5125 3.7125C13.6042 4.1875 14.5542 4.82917 15.3625 5.6375C16.1708 6.44583 16.8125 7.39583 17.2875 8.4875C17.7625 9.57917 18 10.75 18 12C18 13.25 17.7625 14.4208 17.2875 15.5125C16.8125 16.6042 16.1708 17.5542 15.3625 18.3625C14.5542 19.1708 13.6042 19.8125 12.5125 20.2875C11.4208 20.7625 10.25 21 9 21Z" fill="#94A6BD"/>
                        </svg>
                        RESET
                    </button>
                </div>
                <button className={styles.log_btn}>
                    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.0833 0 12.1083 0.158333 13.075 0.475C14.0417 0.791667 14.9333 1.23333 15.75 1.8L14.3 3.275C13.6667 2.875 12.9917 2.5625 12.275 2.3375C11.5583 2.1125 10.8 2 10 2C7.78333 2 5.89583 2.77917 4.3375 4.3375C2.77917 5.89583 2 7.78333 2 10C2 12.2167 2.77917 14.1042 4.3375 15.6625C5.89583 17.2208 7.78333 18 10 18C10.5333 18 11.05 17.95 11.55 17.85C12.05 17.75 12.5333 17.6083 13 17.425L14.5 18.95C13.8167 19.2833 13.1 19.5417 12.35 19.725C11.6 19.9083 10.8167 20 10 20ZM17 18V15H14V13H17V10H19V13H22V15H19V18H17ZM8.6 14.6L4.35 10.35L5.75 8.95L8.6 11.8L18.6 1.775L20 3.175L8.6 14.6Z" fill="#B8B9B9"/>
                    </svg>
                    <span>LOG CURRENT ACTIVITY</span>
                </button>
            </div>
        </div>
    )
}

export default Pomodoro
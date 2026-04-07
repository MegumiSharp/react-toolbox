import { useEffect, useRef, useState } from 'react'
import styles from './Cronometer.module.css'
import NumberFlow from '@number-flow/react'

function Pomodoro(){

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const intervalIdRef = useRef(0);
    const startTimeRef = useRef(0);

    const minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    const seconds = Math.floor(elapsedTime / 1000 % 60 );

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

    function stop(){
        setIsRunning(false)
    }

    function reset(){
        setElapsedTime(0);
        setIsRunning(false);
    }

    const tester = ()=>{
        setElapsedTime(2.64e+6)
    }
    

    return(
        <div className={styles.stopwatch}>
            <div className="display">
                {minutes < 10 ? '0' : ""}
                <NumberFlow value={minutes}/>:
                
                {seconds < 10 ? '0' : ""}
                <NumberFlow value={seconds}/>
            </div>
            <div className="controls">
                <button onClick={start} className="start-button">Start</button>
                <button onClick={stop} className="stop-button">Pause</button>
                <button onClick={reset} className="reset-button">Reset</button>
                <button onClick={tester} className="reset-button">Test</button>
            </div>
            <div> <NumberFlow value={totalTime}/></div>
        </div>
    )
}

export default Pomodoro
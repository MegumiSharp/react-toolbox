import { useRef, useEffect, useState } from 'react'
import styles from './Select.module.css'


interface SelectedProps {
    options: string[],
    placeholder: string,
    onChange: (value: string) => void
}

function Select(props: SelectedProps){

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("")

    
    const wrappedRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(!isOpen) return

        /**Alert if clicked on outside of element*/
        function handleClickOutside(event: MouseEvent) {
            if (wrappedRef.current && !wrappedRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsOpen(false)
            }
        }
    
        // Bind the event listener
        document.addEventListener("click", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
            
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [isOpen]);

    const handleOpening = ()=>{
        setIsOpen(prev => !prev)
    }

    const handleSelection = (option: string)=>{
        props.onChange(option)
        setIsOpen(false)
        setSelected(option)
    }

    return(
        <div className={styles.drowDownMenuContainer} ref={wrappedRef}>
            <button className={styles.DropDownMenuBtn}
                    onClick={()=> handleOpening()}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox">
                
                {selected ? selected : 
                    <div>{props.placeholder}</div>
                    }
                
                <div><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><title>down-arrow</title><g fill="#F7F7F7" strokeLinejoin="miter" strokeLinecap="butt"><polyline fill="none" stroke="#F7F7F7" strokeWidth="3" strokeLinecap="round" strokeMiterlimit="10" points="2,7 12,17 22,7 " transform="translate(0, 0)" strokeLinejoin="miter"></polyline></g></svg></div>
            </button>
            {isOpen && 
                <ul className={styles.menuPanel} role="listbox">
                    {props.options.map(option =>(
                        <li role="option"
                            className={styles.option}
                            key={option}
                            onClick={()=>handleSelection(option)}
                            >
                            {option}
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}

export default Select
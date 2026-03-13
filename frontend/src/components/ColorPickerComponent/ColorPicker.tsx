import styles from "./ColorPicker.module.css"

interface Props {
    hue: number
    saturation: number
    cursorCordTop: number
    savedColors: string[]
    handleMouseMovement: (e: React.MouseEvent<HTMLDivElement>) => void
    onDragStart: () => void       // ✅ non sa nulla di isDragging
    onDragEnd: () => void         // ✅ non sa nulla di isDragging
    getColor: (e: React.MouseEvent<HTMLDivElement>) => void
    onHueChange: (value: number) => void  // ✅ non sa nulla di setHue
    setSavedColor: (e: React.MouseEvent<HTMLButtonElement>) => void
    deleteSavedColor: (color: string) => void
}

function ColorPicker({hue, saturation, cursorCordTop,savedColors, handleMouseMovement, onDragStart, onDragEnd,  getColor, onHueChange,  setSavedColor, deleteSavedColor }: Props){

    return (
        <div className={styles.color_selector_container}>
            <div className={styles.color_picker_title}>Color Picker</div>
            <div style={{display: 'flex', alignItems: 'center', gap: '16px', padding: '24px'}}>
                <div className={styles.picker_container}>
                    <div className={styles.color_box}
                        style={{background: 
                                `linear-gradient(180deg,rgba(255, 255, 255, 0), rgb(0, 0, 0)),
                                linear-gradient(90deg, rgb(255, 255, 255), hsl(${hue}, 100%, 50%))`}}
                        onMouseDown={onDragStart}    
                        onMouseMove={handleMouseMovement}
                        onMouseUp={onDragEnd}           
                        onMouseLeave={onDragEnd}        
                        onClick={getColor}>
                            <div className={styles.cursor} style={{left: `${saturation}%`, top: `${cursorCordTop}%`}}/>                             
                        </div>
                    <div className= {styles.color_bar_container}style={{position: 'relative'}}>
                        <div className={styles.color_bar_visual}/>
                        <input type="range" 
                        style={{'--thumb-color':`hsl(${hue}, 100%, 50%)`} as React.CSSProperties}
                        min={0}
                        max={360}
                        value={hue} 
                        onChange={(e) =>{onHueChange(Number(e.target.value))}} className={styles.range_bar}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.saved_colors_container}>
                <div>Saved Colors</div>
                <div className={styles.saved_colors}>
                    {
                        savedColors.length > 0 ?
                        savedColors.map((color)=>(
                            <button key={color}
                                className={styles.save_color}
                                style={{background: `${color}`}}
                                onClick={(e)=> setSavedColor(e)}
                                onContextMenu={(e)=> {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    deleteSavedColor(color)}}/> 
                        )) :
                            <div className={styles.placeholder_color}>+</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ColorPicker
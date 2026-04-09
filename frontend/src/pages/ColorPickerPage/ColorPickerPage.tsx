import React, {useEffect, useMemo, useState } from "react"

import { hslToHex, rgbToHsl } from "../../utils/Utils.ts"

import CopyColor from "../../components/ColorPickerComponent/CopyColor.tsx"
import ColorPicker from "../../components/ColorPickerComponent/ColorPicker.tsx"
import Header from "../../components/HeaderComponent/Header";
import Footer from "../../components/FooterComponent/Footer.tsx";
import styles from './ColorPickerPage.module.css'

import { motion } from 'framer-motion'


function ColorPickerPage(){

    const [hue, setHue] = useState(0)
    const [saturation, setSaturation] = useState(100)
    const [lightness, setLightness] = useState(50)

    const [savedColors, setSavedColors] = useState<string[]>(()=>{
        const saved = localStorage.getItem('savedColors')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(()=>{
        localStorage.setItem('savedColors', JSON.stringify(savedColors))
    },[savedColors]);

    const [isDragging, setIsDragging] = useState(false)
    const cursorCordTop = useMemo(()=> (100 - (lightness / (100 - (saturation/2)))  *100), [lightness,saturation])

    const hex = hslToHex(hue, saturation, lightness)
    const hsl = `hsl(${hue}, ${saturation}%, ${lightness}%)`
    
    const handleMouseMovement = (e:  React.MouseEvent<HTMLDivElement>) =>{
        
        if(!isDragging) return

        getColor(e)
    }   
    

    const getColor = (e: React.MouseEvent<HTMLDivElement>) => {

        const rect = e.currentTarget.getBoundingClientRect();

        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const sat = Math.min(100, Math.max(x / rect.width * 100))
        const maxLightness = 100 - (sat/2)
        const light = Math.min(maxLightness, Math.max((rect.height - y) / rect.height * maxLightness)) 

        setSaturation(sat)
        setLightness(light)
    }

    const handleCopy = async (value: string) =>{
        await navigator.clipboard.writeText(value)
    }

    const handleSavedColors = () => {
        if(savedColors.includes(hsl)) return 
        setSavedColors(prev => [...prev, hsl])
    }

    const setSavedColor = (e:React.MouseEvent<HTMLButtonElement> )=>{
        const rgbColor = window.getComputedStyle(e.currentTarget).backgroundColor;        //pass the value as rgb
        const clickedHsl = rgbToHsl(rgbColor)

        setHue(clickedHsl.h);
        setSaturation(clickedHsl.s);
        setLightness(clickedHsl.l);
    }

    const deleteSavedColor = (color: string) =>{
        setSavedColors(prev => prev.filter(c => c !== color))
    }
    

    const handleDragStart = () => setIsDragging(true)
    const handleDragEnd = () => setIsDragging(false)
    const handleHueChange = (value: number) => setHue(value)

    return(
        <div className="body_container">
            <Header title="Color Picker Tool"/>
            <motion.div
                initial={{ y: -100, opacity: 0 }}   // stato iniziale
                animate={{ y: 0, opacity: 1 }}       // stato finale
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{width: '100%'}}
            >
            <div className= {styles.main_container}>
                <div className = {styles.sub_main_container}>
                    <ColorPicker
                        hue={hue}
                        saturation={saturation}
                        cursorCordTop={cursorCordTop}
                        savedColors={savedColors}
                        handleMouseMovement={handleMouseMovement}
                        onDragStart={handleDragStart}      
                        onDragEnd={handleDragEnd}         
                        getColor={getColor}
                        onHueChange={handleHueChange}      
                        setSavedColor={setSavedColor}
                        deleteSavedColor={deleteSavedColor}
                    />
                    <CopyColor
                        hsl={hsl}
                        hex={hex}
                        hue={hue}
                        saturation={saturation}
                        lightness={lightness}
                        onSave={handleSavedColors}
                        onCopy={handleCopy}
                    />
                </div>
            </div>
            </motion.div>
            <Footer/>
        </div>
    )
}

export default ColorPickerPage
import styles from "./CopyColor.module.css"
import { hslToRgb } from "../../utils/Utils.ts"

interface Props {
    hsl: string
    hex: string
    hue: number
    saturation: number
    lightness: number
    onSave: () => void
    onCopy: (value: string) => void
}


function CopyColor({ hsl, hex, hue, saturation, lightness, onSave, onCopy}: Props) {
    const rgb = hslToRgb(hue, saturation,lightness);

    return (
        <div className={styles.color_selector_container}>
            <div className={styles.color_picker_title}>Selected Color</div>

            <button
                onClick={onSave}
                className={styles.color_selected_button}
                style={{ background: `${hsl}` }}
            />

            <div className={styles.panel}>

                {/* HEX */}
                <div className={styles.row}>
                    <span className={styles.rowLabel}>HEX:</span>
                    <div className={styles.input}>
                        <div className={styles.valueGroup}>
                            <span className={styles.labelText}>#</span>
                            <span className={styles.valueText}>{hex.replace("#", "")}</span>
                        </div>
                        <button className={styles.copyBtn}  onClick={ ()=> onCopy(`${hex}`)}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <rect x="0" y="0" width="7" height="7" fill="#F7F7F7" />
                                <rect x="4" y="4" width="7" height="7" fill="none" stroke="#F7F7F7" strokeWidth="1.5" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* RGB */}
                <div className={styles.row}>
                    <span className={styles.rowLabel}>RGB</span>
                    <div className={styles.input}>
                        <div className={styles.inputValues}>
                            <div className={styles.valueGroup}>
                                <span className={styles.labelText}>R</span>
                                <span className={styles.valueText}>{rgb.r}</span>
                            </div>
                            <div className={styles.valueGroup}>
                                <span className={styles.labelText}>G</span>
                                <span className={styles.valueText}>{rgb.g}</span>
                            </div>
                            <div className={styles.valueGroup}>
                                <span className={styles.labelText}>B</span>
                                <span className={styles.valueTextWhite}>{rgb.b}</span>
                            </div>
                        </div>
                        <button className={styles.copyBtn} onClick={ ()=> onCopy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <rect x="0" y="0" width="7" height="7" fill="#F7F7F7" />
                                <rect x="4" y="4" width="7" height="7" fill="none" stroke="#F7F7F7" strokeWidth="1.5" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* HSL */}
                <div className={styles.row}>
                    <span className={styles.rowLabel}>HSL</span>
                    <div className={styles.input}>
                        <div className={styles.inputValues}>
                            <div className={styles.valueGroup}>
                                <span className={styles.labelText}>H</span>
                                <span className={styles.valueText}>{hue}</span>
                            </div>
                            <div className={styles.valueGroup}>
                                <span className={styles.labelText}>S</span>
                                <span className={styles.valueText}>{Math.round(saturation)}%</span>
                            </div>
                            <div className={styles.valueGroup}>
                                <span className={styles.labelText}>L</span>
                                <span className={styles.valueTextWhite}>{Math.round(lightness)}%</span>
                            </div>
                        </div>
                        <button className={styles.copyBtn} onClick={ ()=> onCopy(`hsl(${hue}, ${Math.round(saturation)}%, ${Math.round(lightness)}%); `)}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <rect x="0" y="0" width="7" height="7" fill="#F7F7F7" />
                                <rect x="4" y="4" width="7" height="7" fill="none" stroke="#F7F7F7" strokeWidth="1.5" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CopyColor
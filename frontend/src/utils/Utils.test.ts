import { describe, it, expect } from 'vitest'
import { rgbToHex, hslToRgb, hslToHex, RGB_NOT_VALID, HSL_NOT_VALID } from "./Utils.ts"

// ─── rgbToHex ───────────────────────────────────────────────
describe('rgbToHex', () => {
  it('converte RGB base in HEX', () => {
    expect(rgbToHex(255, 99, 71)).toBe('#FF6347')
  })

  it('aggiunge zero per valori piccoli (padStart)', () => {
    expect(rgbToHex(0, 255, 0)).toBe('#00FF00')
  })

  it('nero puro', () => {
    expect(rgbToHex(0, 0, 0)).toBe('#000000')
  })

  it('bianco puro', () => {
    expect(rgbToHex(255, 255, 255)).toBe('#FFFFFF')
  })

  it('lancia errore se un valore supera 255', () => {
    expect(() => rgbToHex(256, 0, 0)).toThrow(RGB_NOT_VALID)
  })

  it('lancia errore se un valore è negativo', () => {
    expect(() => rgbToHex(0, -1, 0)).toThrow(RGB_NOT_VALID)
  })

  it('lancia errore se un valore è decimale', () => {
    expect(() => rgbToHex(1.5, 0, 0)).toThrow(RGB_NOT_VALID)
  })
})

// ─── hslToRgb ───────────────────────────────────────────────
describe('hslToRgb', () => {
  it('rosso puro', () => {
    expect(hslToRgb(0, 100, 50)).toEqual({ r: 255, g: 0, b: 0 })
  })

  it('verde puro', () => {
    expect(hslToRgb(120, 100, 50)).toEqual({ r: 0, g: 255, b: 0 })
  })

  it('blu puro', () => {
    expect(hslToRgb(240, 100, 50)).toEqual({ r: 0, g: 0, b: 255 })
  })

  it('bianco (lightness 100)', () => {
    expect(hslToRgb(0, 0, 100)).toEqual({ r: 255, g: 255, b: 255 })
  })

  it('nero (lightness 0)', () => {
    expect(hslToRgb(0, 0, 0)).toEqual({ r: 0, g: 0, b: 0 })
  })

    it('accetta valori decimali per s e l', () => {
    expect(hslToRgb(159, 61.2, 35.67)).toEqual({ r: 35, g: 147, b: 108 })
    })

  it('lancia errore se hue > 360', () => {
    expect(() => hslToRgb(361, 50, 50)).toThrow(HSL_NOT_VALID)
  })

  it('lancia errore se hue < 0', () => {
    expect(() => hslToRgb(-1, 50, 50)).toThrow(HSL_NOT_VALID)
  })

  it('lancia errore se saturazione > 100', () => {
    expect(() => hslToRgb(180, 101, 50)).toThrow(HSL_NOT_VALID)
  })

  it('lancia errore se lightness < 0', () => {
    expect(() => hslToRgb(180, 50, -1)).toThrow(HSL_NOT_VALID)
  })
})

// ─── hslToHex ───────────────────────────────────────────────
describe('hslToHex', () => {
  it('rosso puro', () => {
    expect(hslToHex(0, 100, 50)).toBe('#FF0000')
  })

  it('verde puro', () => {
    expect(hslToHex(120, 100, 50)).toBe('#00FF00')
  })

  it('blu puro', () => {
    expect(hslToHex(240, 100, 50)).toBe('#0000FF')
  })

  it('propaga errore HSL non valido', () => {
    expect(() => hslToHex(400, 50, 50)).toThrow(HSL_NOT_VALID)
  })
})
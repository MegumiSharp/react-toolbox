export const HSL_NOT_VALID = "HSL values must be valid, hue must be between 0 and 360 and staturation an light mut be betwenn 0 an 100"
export const RGB_NOT_VALID  = "RGB values must be integers between 0 and 255"


// Math formula https://www.baeldung.com/cs/convert-color-hsl-rgb
export function hslToRgb(h: number, s:number, l:number) : {r: number, g: number, b: number} {

    const isValidHue = h <= 360 && h >= 0
    const isValidSL = (x:number) =>  x >= 0 && x <= 100

    if(!isValidHue || !isValidSL(s) || !isValidSL(l)){
        throw new Error(HSL_NOT_VALID)
    }

    let R = 0, G = 0, B = 0

    const saturation = s / 100;
    const lightness = l / 100;
    
    const H  = h / 60
    const C = (1 - Math.abs(2 * lightness - 1)) * saturation
    const X = C * (1- Math.abs((H  % 2) -1))
    const m = lightness - (C/2)

    const sector = Math.floor(h / 60)

    switch(sector){
        case 0: R = C; G= X; B = 0; break
        case 1: R = X; G= C; B = 0; break
        case 2: R = 0; G= C; B = X; break
        case 3: R = 0; G= X; B = C; break
        case 4: R = X; G= 0; B = C; break
        case 5: R = C; G= 0; B = X; break
    }

    return {r: Math.round((R + m) * 255), 
            g: Math.round((G + m) * 255), 
            b: Math.round((B + m) * 255)};
}

// Hex value are rgb values from base 10 to base 16. We use padStart to ensure small number have 2 digist in base 16
export function rgbToHex(r: number, g: number, b:number) : string{

    const isValid = (x:number) => Number.isInteger(x) && x >= 0 && x <= 255;

    if(!isValid(r) || !isValid(g) || !isValid(b)){
        throw new Error(RGB_NOT_VALID);
    }

    const hex = "#" + 
                r.toString(16).padStart(2, '0').toUpperCase() +
                g.toString(16).padStart(2, '0').toUpperCase() +
                b.toString(16).padStart(2, '0').toUpperCase()

    return hex
}


export function hslToHex(h: number, s:number, l:number): string{
    const rgb = hslToRgb(h,s,l)

    return rgbToHex(rgb.r, rgb.g, rgb.b)
}

//Works with css string "rgb(51, 119, 153)";
export function rgbToHsl(rgb: string): {h: number, s: number, l: number} {

    const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)

    if(!match) return {h: 0, s: 0, l: 0}
    
    const r = Number(match[1])
    const g = Number(match[2])
    const b = Number(match[3])


    const normR = r / 255;
    const normG = g / 255;
    const normB = b / 255;

    const max = Math.max(normR, normG, normB);
    const min = Math.min(normR, normG, normB);
    const delta = max - min;

    const lightness = (max + min) / 2;
    const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

    let hue = 0;

    if (delta !== 0) {
        if (max === normR) hue = 60 * (((normG - normB) / delta) % 6);
        else if (max === normG) hue = 60 * (((normB - normR) / delta) + 2);
        else if (max === normB) hue = 60 * (((normR - normG) / delta) + 4);

        if (hue < 0) hue += 360;
    }

    return {h: Math.round(hue),
            s: Math.round(saturation * 100),
            l: Math.round(lightness * 100)
    };
}
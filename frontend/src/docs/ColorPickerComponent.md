
## Color Selector

Il selettore di colore in genere è una feature già built-in in vari browser, ma di fatto difficile da customizzare, per questo motivo ed anche per via dell'utilizzo di Zen come browser, ho deciso di provarlo a re-implementarlo da 0, sia per testare le mie skill che comprenderne il funzionamento.

Il selettore di colori ha 2 parti principali di cui voglio discutere l'implementazione:
- il selettore a barra di colore principale
- il quadrato selettore della saturazione e luminosità

Partiamo da un momento di teoria dei colori. Il tipo di colore che useremo è HSL ovvero Hue, Saturation e Lightness. Il valore Hue va da 0 a 360 e rappresenta tutti i colori dello spettro visibile nella loro massima vivacità — rosso a 0°, giallo a 60°, verde a 120°, ciano a 180°, blu a 240°, magenta a 300°, per poi tornare al rosso a 360°. La Saturation va da 0% a 100% e rappresenta quanto il colore è vivido: a 0% qualsiasi hue diventa grigio, a 100% è il colore puro. La Lightness va da 0% a 100% e rappresenta la luminosità: a 0% è sempre nero, a 100% è sempre bianco, e il colore puro si trova esattamente al 50%.

Il motivo per cui HSL è preferibile a RGB o HEX per questo tipo di implementazione è che i suoi tre valori mappano direttamente a come l'occhio umano percepisce il colore — è intuitivo ragionare in termini di "quanto è vivido" e "quanto è chiaro" piuttosto che in termini di quantità di rosso, verde e blu. Questo lo rende ideale per costruire un'interfaccia dove l'utente esplora il colore visivamente.

---

### Implementazione barra HUE

La barra Hue è un `input range` da 0 a 360 con un gradiente CSS che percorre tutti i colori dello spettro. Il valore restituito è direttamente il grado H di HSL — nessuna conversione necessaria.

Tramite CSS riusciamo ad eliminare tutti gli attributi di base tramite `appearance: none` e `-webkit-appearance: none`, dopodiché applichiamo un gradiente lineare che percorre tutti e 6 i colori chiave dello spettro HSL a intervalli di 60°. Il cursore viene selezionato e stilizzato con `::-webkit-slider-thumb` per Chrome/Edge e `::-moz-range-thumb` per Firefox.

Per l'implementazione si usa lo stato `const [hue, setHue] = useState(0)` chiamando `onChange` sull'`input`. Per cambiare in tempo reale il colore ci basterà usare `hsl(${hue}, 100%, 50%)`.

---

### Implementazione del quadrato

Il quadrato è più interessante. I suoi due assi rappresentano Saturation (orizzontale - x) e Lightness (verticale - y). Visivamente è ottenuto sovrapponendo due gradienti CSS: uno orizzontale che va da bianco al colore puro dell'hue selezionato, e uno verticale che va da trasparente a nero. In CSS è possibile sovrapporre più gradienti separandoli con una virgola nella proprietà `background` — il primo è in cima, il secondo sotto. Per far vedere quello sotto attraverso quello sopra, il gradiente superiore usa `transparent` come colore finale.

Il primo elemento importante è scrivere i gradienti direttamente in React tramite `style` inline, in modo che il secondo gradiente possa ricevere lo stato `hue` e aggiornare la tinta in tempo reale.

La seconda parte da implementare è il color picker. L'asse x va da 0% a 100% e rappresenta la Saturation, l'asse y va da 0% a 100% e rappresenta la Lightness. Creiamo quindi i due stati:

- `const [saturation, setSaturation] = useState(100)`
- `const [lightness, setLightness] = useState(50)`

Quando l'utente clicca nel box, tramite `onClick` viene chiamata la funzione `getColor`:

```ts
const getColor = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const sat = Math.min(100, Math.max(0, x / rect.width * 100))
    const maxLightness = 100 - (sat / 2)
    const light = Math.min(maxLightness, Math.max(0, (rect.height - y) / rect.height * maxLightness))
    setSaturation(sat)
    setLightness(light)
}
```

`getBoundingClientRect()` restituisce le dimensioni e la posizione del div nella pagina. `e.clientX` e `e.clientY` sono le coordinate del click rispetto all'intera finestra — per ottenere la posizione relativa al quadrato sottraiamo `rect.left` e `rect.top`.

Per ottenere la saturazione convertiamo la posizione X in percentuale: `x / rect.width * 100`. Se l'utente clicca a 218px su un quadrato largo 250px, otteniamo `218 / 250 * 100 = 87.2%` — esattamente il valore S da passare a HSL.

Per la lightness il calcolo è simile ma con due differenze. La prima: la percentuale deve essere **invertita** perché l'asse Y del mouse cresce verso il basso (0 in alto, 100 in basso), mentre visivamente vogliamo il chiaro in alto e lo scuro in basso. Sottraendo `y` dall'altezza totale `rect.height - y` otteniamo l'inversione — quando il click è in alto `y` è piccolo e il risultato è grande, quando è in basso `y` è grande e il risultato si avvicina a zero.

La seconda differenza: la lightness non può arrivare a 100% quando la saturation è alta, perché a L=100% qualsiasi colore diventa bianco indipendentemente dall'hue. Il tetto massimo è `maxLightness = 100 - (saturation / 2)` — a S=100% il massimo è L=50% (colore puro), a S=0% il massimo è L=100% (bianco). Questo garantisce che l'angolo in alto a destra sia sempre il colore puro e non il bianco.

---

### Drag circle

Il cerchio è un `div` figlio del quadrato con `position: absolute` e `pointer-events: none` — quest'ultimo è fondamentale per evitare che il cerchio intercetti i click e interferisca con `getBoundingClientRect()`. Il quadrato padre ha `position: relative` per fare da riferimento al posizionamento assoluto del figlio.

Per il drag vengono usati quattro eventi sul quadrato: `onMouseDown` imposta `isDragging` a `true`, `onMouseMove` chiama `getColor` solo se `isDragging` è `true`, `onMouseUp` e `onMouseLeave` reimpostano `isDragging` a `false`. `onMouseLeave` è necessario perché se il mouse esce dal quadrato velocemente durante il drag, `onMouseUp` non scatta e il cursore rimarrebbe bloccato in modalità dragging.

La posizione del cerchio rispecchia l'inverso esatto del calcolo di `getColor` — se da coordinate pixel ricaviamo saturation e lightness, qui da saturation e lightness ricaviamo le coordinate percentuali da passare a `left` e `top`:

```tsx
<div
  className={styles.cursor}
  style={{
    left: `${saturation}%`,
    top: `${100 - (lightness / (100 - (saturation / 2)) * 100)}%`
  }}
/>
```

`left` è direttamente `saturation%`. Per `top` invertiamo la lightness normalizzandola rispetto a `maxLightness` e sottraendo da 100 — quando la lightness è al massimo `top` è 0% (in alto), quando è 0 `top` è 100% (in basso).
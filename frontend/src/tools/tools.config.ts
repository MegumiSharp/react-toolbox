import todocard from '../assets/todocard.png'
import colorpickercard from '../assets/colorpickercard.png'
import placeholderImage from '../assets/placeholderImage.jpg'

export type Tool = {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  routerPath: string;
};

export const Tags: Record<string, string> = {
  produttività: "#7D8F7C",   
  arte:         "#7C8CA6",  
  design:       "#A67C8C",   
  utility:      "#8C7CA6",  
  musica:       "#A6897C",   
  foto:         "#7CA6A0",  
  testo:        "#A6A27C",   
  matematica:   "#7C9BA6",   
  colore:       "#A68E7C",  
  tempo:        "#7c9ea6",   
  finanza:      "#7CA67E",   
  giochi:       "#A67C7C",   
  coding:       "#7C8CA6",   
  convertitore: "#9BA67C",   
}

export const tools: Tool[] = [
    {
        id: 'todo-list',
        title: 'To Do List',
        description: 'Organizza le tue attività, imposta priorità e tieni traccia di ciò che conta davvero. Semplice, veloce, senza distrazioni.',
        tags: ['produttività', 'tempo', 'utility'],
        routerPath: '/todolist',
        image: todocard
    },
    {
        id: 'colorpicker',
        title: 'Color Picker',
        description: 'Esplora, crea e salva palette di colori. Converti tra HEX, RGB e HSL in un istante, pronti da usare nel tuo prossimo progetto.',
        tags: ['produttività', 'arte'],
        routerPath: '/colorpicker',
        image: colorpickercard
    },
    {
        id: 'cronometer',
        title: 'Cronometro',
        description: 'Constata quanto tempo ci metti a fare le piú disparate attività, grazie a questo cronometro, semplice ed intuitivo, puoi tenere traccia di quanto ci é voluto a fare cosa.',
        tags: ['produttività', 'utility', 'tempo'],
        routerPath: '/cronometer',
        image: placeholderImage
    }
]

export default tools
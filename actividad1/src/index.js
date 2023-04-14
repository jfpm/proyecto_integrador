import './styles.css'
import ReactDom from "react-dom/client";
import { Experience } from './Experience';
import { Entregable1 } from './Entregable1';
import { Canvas } from '@react-three/fiber';

const root = ReactDom.createRoot(document.querySelector('#root'))

root.render(
    <Canvas>
        <Entregable1/>
    </Canvas>
  
)

/*
* Actividad 1 
* Presentado por: Jhon Freddy Popo Moreno
* Codigo: 202010003
*/
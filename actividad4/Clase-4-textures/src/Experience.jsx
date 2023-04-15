import { OrbitControls, useHelper, ContactShadows, Sky } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import Door from './Door'
import Fabric from './Fabric'
import Pebbles from './Pebbles'
import Floor from './Floor'
import { DirectionalLightHelper } from 'three'
import { useRef } from 'react'
import * as THREE from 'react'
import { useControls } from 'leva'


export default function Experience() {
    const directionalLightRef = useRef()
    useHelper(directionalLightRef, THREE.DirectionalLightHelper, 0.5)

    useHelper(directionalLightRef, DirectionalLightHelper, 1)

    const { color, opacity, blur} = useControls('contact shadows', {
        color: '#1d8f75',
        opacity: { value: 0.4, min:0.5, max:1},
        blur: {value:2.8, min:0, max:10}
    })

    const { sunPosition } = useControls('sky', {
        sunPosition: {value: [1, 2, 3]}
    })

    return <>
        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <ContactShadows position={[0, - 0.99, 0]} scale={10} resolution={512} far={5} color={color} opacity={opacity} blur={blur} frames={1}
        />

        
        <directionalLight ref={directionalLightRef} position={[1, 2, 3]} intensity={1.5} castShadow 
        />
        <ambientLight intensity={0.5} />

        <Sky sunPosition={sunPosition}/>

        <Door/>
        <Floor />
    </>
}
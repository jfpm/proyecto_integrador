import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import Door from './Door'
import Fabric from './Fabric'
import Pebbles from './Pebbles'
import Floor from './Floor'

export default function Experience() {
    return <>
        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />
        <Door/>
        <Floor />
    </>
}
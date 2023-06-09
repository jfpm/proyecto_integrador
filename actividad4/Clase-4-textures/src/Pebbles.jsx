import { DoubleSide } from "three";
import { useTexture } from "@react-three/drei";

export default function Pebbles() {

    const PATH = "/static/textures/pebbles/"

    const props = useTexture({
        map: PATH + 'color.jpg',
        displacementMap: PATH + 'height.png',
        normalMap: PATH + 'normal.jpg',
        roughnessMap: PATH + 'roughness.jpg',
        aoMap: PATH + 'ao.jpg',
        //metalnessMap: PATH + 'metalic.jpg'
    })



    return (


        <mesh rotation-y={Math.PI / 12}>
            <planeGeometry args={[2, 3]} />
            <meshStandardMaterial {...props} side={DoubleSide} />
        </mesh>
    )
}
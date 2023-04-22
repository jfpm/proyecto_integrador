import { OrbitControls, Sky, useVideoTexture, Grid, Center, AccumulativeShadows, RandomizedLight, Environment, useGLTF, CameraControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import CurvedPlaned from './models/CurvedPlaned'
import CurvedPlaned2 from './models/CurvedPlanedImagen'
import * as THREE from 'three'
import { forwardRef, useState, Suspense, useMemo, useRef, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useControls, button } from 'leva'
import { CurvedPlane } from 'three-stdlib';
import Banana from './models/Banana'

const { DEG2RAD } = THREE.MathUtils

const video = document.createElement( 'video' );



export default function Experience() {
    
    return <>
        <Perf position="top-left" />
        <Scene />
        <Ground />
        <OrbitControls makeDefault />
        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />
        <AccumulativeShadows frames={100} color="#9d4b4b" colorBlend={0.5} alphaTest={0.9} scale={20}>
            <RandomizedLight amount={8} radius={4} position={[5, 5, -10]} />
        </AccumulativeShadows>

        <CameraControls />
        <Environment preset="city" />
        <Sky />
        <CurvedPlaned position-x={0} scale={0.08} />
    </>
}

function Scene() {
    const photo = "https://blog.hubspot.es/hubfs/Descarga%20de%20fondos%20para%20pa%CC%81ginas%20web.jpg"
    const url = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'

    video.src = url;
    video.loop = true;
    video.muted = true;
    const curvedplanegeometryRef = useRef(null);
    const onHandleCurveGeometry = () => {
        alert('hi =)')
    }

    const curvedplaneImgRef = useRef(null);
    const onHandleCurveImg = () => {
        alert('hi img =)')
    }
    return (
        <>
            <Center top>
                <Suzi rotation={[-0.63, 0, 0]} />
            </Center>

            <group rotation-y={DEG2RAD * 40} ref={curvedplanegeometryRef}  dispose={null}  onPointerDown={onHandleCurveGeometry}>
                <Screen src={url} />
            </group>

            <group rotation-y={DEG2RAD * -40} ref={curvedplaneImgRef}  dispose={null}  onPointerDown={onHandleCurveImg}>
                <CurvedPlaneWithTexture src={photo} />
            </group>
        </>
    )
}

function Ground() {
    const gridConfig = {
        cellSize: 0.5,
        cellThickness: 0.5,
        cellColor: '#6f6f6f',
        sectionSize: 3,
        sectionThickness: 1,
        sectionColor: '#9d4b4b',
        fadeDistance: 30,
        fadeStrength: 1,
        followCamera: false,
        infiniteGrid: true
    }
    return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />
}

const Suzi = forwardRef((props, ref) => {
    return (
        <>
            <mesh   ref={ref} castShadow receiveShadow {...props}>
                <Banana position-x = {-1} scale={0.1}/>
            </mesh>
        </>
    )
})

function Screen({ src }) {

    const [video, setVideo] = useState(false)
    const ratio = 16 / 9
    const width = 5
    const radius = 4
    const z = 4
    const r = useMemo(() => (video ? video.videoWidth / video.videoHeight : ratio), [video, ratio])
     
    return (
        <Center top position-z={[z]} >
            <CurvedPlaned width={width} height={width / 2} radius={radius} >
                <Suspense fallback={<meshStandardMaterial side={THREE.DoubleSide} wireframe  />}>
                    <VideoMaterial src={src} />
                </Suspense>
            </CurvedPlaned>
        </Center>
    )
}

function CurvedPlaneWithTexture() {
    const ratio = 16 / 9
    const width = 5
    const radius = 4
    const z = 4
    return (
        <Center top position-z={[z]} >
            <CurvedPlaned2 width={width} height={width / 2} radius={radius}>
                <Suspense fallback={<meshStandardMaterial side={THREE.DoubleSide} wireframe />}>
                    <Imagenmaterial />
                </Suspense>
            </CurvedPlaned2>
        </Center>
    );
}

function VideoMaterial({ src, valor = false }) {
    const texture = useVideoTexture(src, { start: valor })
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.x = -1
    texture.offset.x = 1

    return <meshStandardMaterial side={THREE.DoubleSide} map={texture} toneMapped={false} transparent opacity={0.9} />
}

function Imagenmaterial() {
    const texture = useLoader(THREE.TextureLoader, 'https://blog.hubspot.es/hubfs/Descarga%20de%20fondos%20para%20pa%CC%81ginas%20web.jpg');
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.x = -1
    texture.offset.x = 1

    return <meshStandardMaterial side={THREE.DoubleSide} map={texture} toneMapped={false} transparent opacity={0.9} />
}

function onMouseDown(event) {
    alert("Mouse down");
}


/**
 * Hooks Reactjs: https://legacy.reactjs.org/docs/hooks-intro.html
 * React Three Fiber: https://docs.pmnd.rs/react-three-fiber/getting-started/introduction
 * Hooks de R3F: https://docs.pmnd.rs/react-three-fiber/api/hooks
 * React three drei: https://github.com/pmndrs/drei
 * Three.js: https://threejs.org/docs/
 *
 */

import {
  Center,
  OrbitControls,
  PointerLockControls,
  PresentationControls,
} from "@react-three/drei";
import * as THREE from 'three';
import { useFrame, useThree, useLoader  } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Box, Cone, Sphere } from "@react-three/drei";
import { TextureLoader} from 'three';

export function Entregable1() {
  /*definir las rotaciones de los objetos*/
  const [rotationX, setRotationX] = useState(0);
  const [rotationZ, setRotationZ] = useState(0);
  const [positionY, setPositionY] = useState(0);

  //declarar utilizar texturas
  const texture = useLoader(TextureLoader, '/textura.png');
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ map: texture });

  //rotaciones de los boejtos
  useFrame(() => {
    setRotationX(rotationX + 0.02);
    setRotationZ(rotationZ + 0.01);
    setPositionY(Math.sin(performance.now() / 500) * 2);
    
  });

  const TexturedBox = (props) => {
    
  };

  return (
    <>
      <OrbitControls enableDamping makeDefault enableRotate={true} enablePan={false}  />
      
      <ambientLight  intensity={0.5}/>
      <pointLight position={[10, 10, 10]} />
      <TexturedBox position={[0, 0, 0]} />
      <directionalLight position={[10, 3, 3]} intensity={1.5} />
      <Center>
        <mesh position={[1, 3, 1]} rotation={[rotationX, 0, 0]}>
          <Box args={[1, 1, 1]}>
            <meshStandardMaterial attach="material" map={texture}  color={"red"} />
          </Box>
        </mesh>
        <mesh position={[1, 1, 1]} rotation={[0, 0, rotationZ]}>
          <Cone >
            <meshStandardMaterial map={texture} color={"green"} />
          </Cone>
        </mesh>
        <mesh position={[positionY, 0, 0]}>
          <Sphere>
            <meshStandardMaterial map={texture} color={"blue"} />
          </Sphere>
        </mesh>
        <mesh position-y={-2} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshBasicMaterial color="greenyellow"/>
            
        </mesh>
      </Center>
    </>
  );
}

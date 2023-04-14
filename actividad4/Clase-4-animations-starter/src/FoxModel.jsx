import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react';
import { useControls } from 'leva';

export default function FoxModel(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/static/Fox.glb");
  const { actions } = useAnimations(animations, group);

  //leva implemtar metodo
  const { animationName } = useControls({
    animationName: { options: animations.names }
  })

  useEffect(() => {
    const action = animations.actions[animationName]
    action.reset().fadeIn(0.5).play()

    return () => {
      action.fadeOut(0.5)
    }
  }, [animationName])

  return (
    <group ref={group} {...props} dispose={null}>
      <group>
        <group name="root">
          <primitive object={nodes._rootJoint} />
          <skinnedMesh
            name="fox"
            geometry={nodes.fox.geometry}
            material={materials.fox_material}
            skeleton={nodes.fox.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/static/Fox.glb");

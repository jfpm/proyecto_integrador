import { Clone, useGLTF } from '@react-three/drei'

export default  function Model(){
    const model = useGLTF('./static/Hamburger.glb')

    return <>
       {/*  < Clone object={ model.scene } scale={ 0.35 } position-x={ - 4}/> */}
        < Clone object={ model.scene } scale={ 0.35 } position-x={ 0 }/>
        {/* < Clone object={ model.scene } scale={ 0.35 } position-x={ 4 }/> */}
    </>     
}

useGLTF.preload('./static/Hamburger.glb')
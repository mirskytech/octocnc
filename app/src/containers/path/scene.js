import React from 'react';
import * as THREE from 'three';
import Controls from "./controls";

const Cube = () => {
  return (
    <mesh>
      <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
      <meshNormalMaterial attach='material' />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <Cube />
        <Controls/>
    </>
  )
}

export default Scene;

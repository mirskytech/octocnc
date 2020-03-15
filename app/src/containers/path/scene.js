import React from 'react';
import * as THREE from 'three';

function Scene() {
  return (
    <mesh>
      <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
      <meshNormalMaterial attach='material' />
    </mesh>
  );
}

export default Scene;

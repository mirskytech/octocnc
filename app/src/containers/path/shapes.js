import React, {useRef} from "react";
import * as THREE from "three";

export const Cube = () => {
  return (
    <mesh>
      <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
      <meshNormalMaterial attach='material' />
    </mesh>
  )
};

export const SimpleLine = ({start, end, color}) => {
    const vertices = [start, end];
    const linecolor = color || "purple";

    return (
        <line>
            <geometry
                attach="geometry"
                vertices={vertices.map(v => new THREE.Vector3(...v))} />
            <lineBasicMaterial
                attach="material"
                color={linecolor}
                linewidth={3}
            />
        </line>
    );
};

export const MeshLine = ({start, end, color}) => {
    const vertices = [start, end];
    const linecolor = color || "purple";

    return(
            <mesh>
              <meshLine attach="geometry" vertices={vertices.map(v => new THREE.Vector3(...v))} />
              <meshLineMaterial
                attach="material"
                lineWidth={0.05}
                color={linecolor}
              />
            </mesh>
    )
}

export const Axes = () => {

    return(
        <>
          <MeshLine start={[0, 0, 0]} end={[6, 0, 0]} color={"red"} />
          <MeshLine start={[0, 0, 0]} end={[0, 6, 0]} color={"blue"} />
          <MeshLine start={[0, 0, 0]} end={[0, 0, 6]} color={"green"}   />
        </>
    );
};
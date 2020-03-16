import React from "react";
import * as THREE from "three";

export const Cube = () => {
  return (
    <mesh>
      <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
      <meshNormalMaterial attach='material' />
    </mesh>
  )
};

export const Line = ({start, end, color}) => {
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

export const Axes = () => {

    return(
        <>
          <Line start={[0, 0, 0]} end={[2, 0, 0]} color={"red"} />
          <Line start={[0, 0, 0]} end={[0, 2, 0]} color={"blue"} />
          <Line start={[0, 0, 0]} end={[0, 0, 2]} color={"green"}   />
        </>
    );
};
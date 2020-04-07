import React, {useRef} from "react";
import * as THREE from "three";
import {useSelector} from "react-redux";

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
};

import { useState, useMemo } from 'react'
import fontFile from './sans'

export function Text({ children, size = 1, letterSpacing = 0.01, color = '#000000', centerX = true, centerY = true, ...props }) {
  const [font] = useState(() => new THREE.FontLoader().parse(fontFile))
  const [shapes, [x, y]] = useMemo(() => {
    let x = 0,
      y = 0
    let letters = [...String(children)]
    let mat = new THREE.MeshBasicMaterial({ color, opacity: 1, transparent: true })
    return [
      letters.map(letter => {
        const geom = new THREE.ShapeGeometry(font.generateShapes(letter, size, 1))
        geom.computeBoundingBox()
        const mesh = new THREE.Mesh(geom, mat)
        mesh.position.x = x
        x += geom.boundingBox.max.x + letterSpacing
        y = Math.max(y, geom.boundingBox.max.y)
        return mesh
      }),
      [x, y]
    ]
  }, [font, children, size, letterSpacing, color])
  return (
    <group {...props}>
      <group position={[centerX ? -x / 2 : 0, centerY ? -y / 2 : 0, 0]}>
        {shapes.map((shape, index) => (
          <primitive key={index} object={shape} />
        ))}
      </group>
    </group>
  )
}


export const Axes = () => {

    return(
        <>
          <MeshLine start={[0, 0, 0]} end={[6, 0, 0]} color={"red"} />
          <MeshLine start={[0, 0, 0]} end={[0, 6, 0]} color={"blue"} />
          <MeshLine start={[0, 0, 0]} end={[0, 0, 6]} color={"green"}   />
          <Text color="red" size={0.15} position={[2, 2, 1]} rotation={[-Math.PI / 2, 0, 0]} children="abc 123" />
        </>
    );
};
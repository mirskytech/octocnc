import React, {useRef, Suspense} from "react";
import * as THREE from "three";
import {useSelector} from "react-redux";
import { Canvas, useLoader, useFrame, useUpdate } from 'react-three-fiber'


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


// https://github.com/react-spring/react-three-fiber/blob/0eddad37be8cde26fe5f5c72b570f4c76e980743/examples/src/demos/Font.js


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
// https://gero3.github.io/facetype.js/
import sans from './sans.blob'
import bold from './bold.blob'

function TextBlock({ children, vAlign = 'center', hAlign = 'center', size = 1, color = '#000000', ...props }) {
  const font = useLoader(THREE.FontLoader, bold)
  const config = useMemo(
    () => ({
      font,
      size: 10,
      height: 30,
      curveSegments: 16,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 0,
      bevelOffset: 0,
      bevelSegments: 8,
    }),
    [font]
  )
  const mesh = useUpdate(
    self => {
      const size = new THREE.Vector3()
      self.geometry.computeBoundingBox()
      self.geometry.boundingBox.getSize(size)

      self.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
      self.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y;
      // self.color.setRGB(Math.random(), Math.random(), Math.random());
    },
    [children]
  )

  return (
    <group {...props} scale={[0.1 * size, 0.1 * size, 0.01]}>
      <mesh ref={mesh}>
        <textGeometry attach="geometry" args={[children, config]} />
        <meshNormalMaterial
            attach="material"
            color={'0xff0000'}


        />
      </mesh>
    </group>
  )
}

// <Text color="red" size={0.15} position={[2, 2, 1]} rotation={[-Math.PI / 2, 0, 0]} children="abc 123" />

export const Axes = () => {

    return(
        <>
          <MeshLine start={[0, 0, 0]} end={[6, 0, 0]} color={"red"} />
          <MeshLine start={[0, 0, 0]} end={[0, 6, 0]} color={"blue"} />
          <MeshLine start={[0, 0, 0]} end={[0, 0, 6]} color={"green"}   />
      <Suspense fallback={null}>
          <TextBlock hAlign="left" position={[7, 0, 0]} size={1} rotation={[Math.PI / 2, 0, 0]}>X</TextBlock>
                <TextBlock hAlign="left" position={[0, 7, 0]} children="Y" size={1} rotation={[Math.PI / 2, 0, 0]} />
                <TextBlock hAlign="left" position={[0, 0, 7]} children="Z" size={1} rotation={[Math.PI / 2, 0, 0]} />
      </Suspense>
        </>
    );
};

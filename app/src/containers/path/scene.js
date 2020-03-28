import React from 'react';
import * as THREE from 'three';
import Controls from "./controls";
import {useThree} from "react-three-fiber";
import Lights from "./lights";
import {Axes, Cube, Line, MeshLine} from "./shapes";
import {connect, useSelector} from "react-redux";
import {bindActionCreators} from "redux";


function Scene() {
      const { camera } = useThree();
  camera.fov = 45;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.near = 0.1;
  camera.far = 1000;

  camera.up.set(0, 0, 1);
  camera.position.set(-5, 7, 5);

  // const points = [
  //     {start: [0,0,0],          end: [0.5,0.5,0.25] },
  //     {start: [0.5,0.5,0.25],   end: [1, 1, 0.5]   },
  //     {start: [1, 1, 0.5],      end: [1, 1.25, 1]}
  // ];




    const points = useSelector(state => state.path.traversal).toArray();
  const path = [];
  for(let i = 0; i < points.length - 1; i++) {
      path.push({
          start: [points[i].x, points[i].y, points[i].z],
          end: [points[i+1].x, points[i+1].y, points[i+1].z]
      });
  }

  return (
    <>
              <Lights
        type='AmbientLight'
        color={0xff0000}
        intensity={5.9}
        position={[1, 1, 1]}
      />
        {[[-5, -12, 20], [5, -12, 20], [-5, 12, 20], [5, 12, 20]].map(pos => (
        <Lights
        type='PointLight'
        color={0xffffff}
        intensity={0.4}
        distance={100}
        position={pos}
        castShadow
        />
      ))}
        <Axes />
        <Controls/>
        {path.map(p => (
            <MeshLine
            start={p.start}
            end={p.end}
            color={'black'}
            />
        ))}
    </>
  )
}

// function mapStateToProps(state) {
//     return {
//         points: state.path.traversal
//     }
// }
//
// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({
//     }, dispatch);
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Scene);
export default Scene;

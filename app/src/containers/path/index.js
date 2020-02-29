import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import './MyComponent.scss';

import {Button, Row, Col, Input, Slider, InputNumber} from 'antd';
import * as THREE from 'three'

import { useRef, useEffect, useState, useCallback, useContext, useMemo } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'


class Path extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            feedRate: this.props.feedMin,
            nextX: null,
            nextY: null,
            nextZ: null,
            active: null
        };
    }

    box = (props) => {
      // This reference will give us direct access to the mesh
      const mesh = useRef();

      // Set up state for the hovered and active state
      const [hovered, setHover] = useState(false)
      const [active, setActive] = useState(false)

      // Rotate mesh every frame, this is outside of React without overhead
      useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

      return (
        <mesh
          {...props}
          ref={mesh}
          scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
          onClick={e => setActive(!active)}
          onPointerOver={e => setHover(true)}
          onPointerOut={e => setHover(false)}>
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
      )
    };



    endPoint = ({ position, onDrag, onEnd }) => {
      // let [bindHover, hovered] = useHover(false);
      // let bindDrag = useDrag(onDrag, onEnd);

      /*const [active, setActive] = useState(true)
      if (!active) bindDrag = undefined
      if (!active) bindHover = undefined
      useEffect(() => void setTimeout(() => console.log('________inactive') || setActive(false), 2000), [])
      useEffect(() => void setTimeout(() => console.log('________active!!') || setActive(true), 6000), [])*/

      return (
        <mesh position={position} /*{...bindDrag} {...bindHover}*/ onClick={e => console.log(e)}>
          <sphereBufferGeometry attach="geometry" args={[0.5, 1, 1]} />
          <meshBasicMaterial attach="material" color={/*hovered ? 'hotpink' : */'blue'} />
        </mesh>
      );
    };

    line = ({ defaultStart, defaultEnd }) => {
      const [start, setStart] = useState(defaultStart);
      const [end, setEnd] = useState(defaultEnd);
      const vertices = useMemo(() => [start, end].map(v => new THREE.Vector3(...v)), [start, end]);
      const update = useCallback(self => ((self.verticesNeedUpdate = true), self.computeBoundingSphere()), []);
      return (
        <>
          <line>
            <geometry attach="geometry" vertices={vertices} onUpdate={update} />
            <lineBasicMaterial attach="material" color="red" />
          </line>
          <this.endPoint position={start} onDrag={v => setStart(v.toArray())} />
          <this.endPoint position={end} onDrag={v => setEnd(v.toArray())} />
        </>
      )
    };



    render() {

        return (
            <Row type="flex" justify="center" align="middle" style={{height:300}}>
                  <Canvas>
                        <ambientLight />
                        <pointLight position={[10, 10, 10]} />
                        <this.box position={[-1.2, 0, 0]} />
                        <this.box position={[1.2, 0, 0]} />
                        <this.line defaultStart={[-2, -2, 1]} defaultEnd={[1, 2, 1]} />
                        <this.line defaultStart={[1, 2, 1]} defaultEnd={[2, -2, 1]} />
                  </Canvas>
            </Row>

        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

Path.defaultProps = {

};

Path.propTypes = {

};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Path);

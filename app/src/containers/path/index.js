
import React, { useMemo, useRef } from 'react'

import { extend, Canvas, useFrame, useThree } from 'react-three-fiber'
import Scene from "./scene";
import {ReactReduxContext, Provider, useSelector, connect} from "react-redux";
import {getThreeScene} from "./pieces/scene";
import {getThreeCamera} from "./pieces/camera";
import {getThreeRenderer} from "./pieces/renderer";
import {mapStateToScene} from "./helpers";


export function FunctionApp() {
  const mouse = useRef([0, 0]);
  const points = useSelector(state => state.path);

  return (
  <ReactReduxContext.Consumer>
      {
          ({store}) => (
              <Canvas style={{background: '#ffffff', height:600}}>
                  <Provider store={store}>
                      <Scene />
                  </Provider>
              </Canvas>
          )
      }
  </ReactReduxContext.Consumer>
  )
}



class ClassApp extends React.Component {

    renderNextFrame = () => {
        this.threeRenderer.render(this.scene, this.camera);
        requestAnimationFrame(timestamp => this.props.update(timestamp));
    };

    componentDidMount() {
        this.scene = getThreeScene();
        this.camera = getThreeCamera();
        this.threeRenderer = getThreeRenderer();

        this.renderNextFrame()
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.lastAction === 'UPDATE';
    }

    componentWillUpdate() {
        mapStateToScene(this.props.sceneState, this.scene);
        this.renderNextFrame();
    }
    render() {
        return (
            <div>
                <ThreeDisplay />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        timestamp: state.timestamp,
        lastAction: state.lastAction,
        sceneState: state.scene
    }
};

const mapDispatchTopProps = dispatch => {
    return {
        update: timestamp => dispatch(update(timestamp))
    }
};

export default connect(mapStateToProps, mapDispatchTopProps)(ClassApp);


import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import digit from '../assets/octocnc_sprites_digit.svg';
import ReactSVG from 'react-svg';

const segment_map = {
    0: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'l'],
    1: ['c', 'd'],
    2: ['a', 'b', 'c', 'o', 'q', 'g', 'f', 'e'],
    3: ['a', 'b', 'c', 'd','e', 'f', 'o', 'q'],
    4: ['o', 'q', 'h', 'c', 'd'],
    5: ['a', 'b', 'h', 'o', 'q', 'd', 'e', 'f'],
    6: ['a', 'b', 'o', 'q', 'd', 'e', 'f', 'g', 'h'],
    7: ['a', 'b', 'c', 'd'],
    8: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'o','q'],
    9: ['a', 'b', 'c', 'd', 'h', 'o', 'q'],
    '-': ['o', 'q'],
    '+': ['n', 'o', 'q', 'r'],
    'X': ['i', 'j', 'k', 'l'],
    'Y': ['i', 'j', 'r', 'p'],
    'Z': ['a','b', 'e', 'f', 'j', 'l', ]

};

const digitStyle = { width: 50, display:'inline', float:'left'};


class Digit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    digitLoaded = (svg) => {
        this.display = svg;
        this.setSegments();
    };


    setSegments = () => {
        if(this.display !== undefined && this.props.value !== undefined) {
            for(let item of this.display.children) {
                item.style.fill = this.props.backgroundColor;
            }
          for(let item of segment_map[this.props.value]) {
              this.display.children['segment_'+item].style.fill = this.props.fillColor;
          }
        }
    };

    shouldComponentUpdate() {
        this.setSegments();
        return this.display === undefined;
    }

    render() {

        let styling = {
            ...this.props.style,
            ...digitStyle
        };

        return (
            <ReactSVG
              path={digit}
              callback={this.digitLoaded}
              className="digit"
              evalScript="once"
              style={styling}
              onClick={this.handleClick}
            />
        )
    }
}

function mapStateToProps(state) {
    return {

    };
}

Digit.defaultProps = {
    style:{},
    value: null,
    fillColor:'#3A7A91',
    backgroundColor:'#f0f0f0'
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Digit);
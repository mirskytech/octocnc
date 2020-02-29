import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import digit from 'assets/octocnc_sprites_digit.svg';
import { ReactSVG } from 'react-svg';
import {Colors} from 'enums';

const SEGMENT_MAP = {
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
    'Z': ['a','b', 'e', 'f', 'j', 'l', ],
    'm': ['g', 'q', 'r', 'p', 'o', 'd' ],
    'i': ['p', 'r', 'm'],
    'n': ['g', 'q', 'r', 'p'],
    'blank': []

};


class Digit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.display = null;
    }

    digitLoaded = (err, svg) => {
        this.display = svg;
        this.setSegments();
    };


    setSegments = () => {
        let rx = /segment_(\w)(-\d*)?/;

        if(this.display == null) return;

        if(this.props.value != null) {

            if(!SEGMENT_MAP.hasOwnProperty(this.props.value)) {
                console.log("missing display: " + this.props.value);
            }

            for(let item of this.display.children) {

                let segment = item.id.match(rx);
                if(segment == null) {
                    continue;
                }

                if (SEGMENT_MAP[this.props.value].includes(segment[1])) {
                    item.style.fill = this.props.fillColor;
                } else {
                    item.style.fill = this.props.backgroundColor;
                }
            }
        } else {
            for(let item of this.display.children) {
                item.style.fill = null;
            }
        }
    };

    render() {
        this.setSegments();
        return (
            <div className={'digit ' + this.props.className}>
                <ReactSVG
                  src={digit}
                  afterInjection={this.digitLoaded}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    };
}

Digit.defaultProps = {
    className: '',
    value: null,
    fillColor: Colors.lightBlue.color,
    backgroundColor: Colors.lightGray.color
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Digit);

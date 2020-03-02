import {Component} from "react";
import {Button, Input, Row, Col, Popconfirm} from "antd";
import React from "react";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";

import {disablePlugin} from "../../action_creators";


class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <div className={'mt4'}>
                <Row type="flex" justify="center" align="middle">
                    <Col span={6}>
                          <Popconfirm
                              title="This will disable the OctoCNC interface.<br/>Are you sure?"
                              onConfirm={this.props.disablePlugin}
                              okText="Yes"
                              cancelText="No"
                          >
                            <Button>Disable OctoCNC Plugin</Button>
                          </Popconfirm>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

Settings.defaultProps = {

};

Settings.propTypes = {

};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        disablePlugin:disablePlugin
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

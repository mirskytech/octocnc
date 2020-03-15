import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../action_creators";
import bytes from "bytes";
import {Button, Upload} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Decimal from "decimal.js";
import dayjs from "dayjs";
import Moment from "react-moment";
import PrinterOutlined from "@ant-design/icons/es/icons/PrinterOutlined";
import DeleteOutlined from "@ant-design/icons/es/icons/DeleteOutlined";
import EditOutlined from "@ant-design/icons/es/icons/EditOutlined";
import DownloadOutlined from "@ant-design/icons/es/icons/DownloadOutlined";


class FileActioner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {


        return (
            <div className={'m2 p1 panel'}>
                <div className={'p1 bold'}>Selected File</div>
                <div>{this.props.node.title}</div>
                <div>{bytes(this.props.node.size, {decimalPlaces: 1})}</div>
                <div><Moment unix format="MMM D, YYYY h:mm a">{this.props.node.date}</Moment> (<Moment unix fromNow>{this.props.node.date}</Moment>)</div>
                <div className={'m1'}>
                    <Button className={'m1'}>
                        <EyeOutlined className={'actionIcon'}/>
                    </Button>
                    <Button className={'m1'}>
                        <DeleteOutlined className={'actionIcon'}/>
                    </Button>
                    <Button className={'m1'}>
                        <EditOutlined className={'actionIcon'} />
                    </Button>
                    <Button className={'m1'}>
                        <DownloadOutlined className={'actionIcon'}/>
                    </Button>
                </div>
            </div>
        )
    }
}

FileActioner.defaultProps = {
    node: {}
};

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FileActioner);

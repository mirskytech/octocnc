import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "antd/es/button/button";
import {Col, Tree, Row, Progress, Tooltip} from "antd";
import * as actions from "../../action_creators";
import bytes from "bytes";
import {randomBytes} from "crypto";
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { showLocalFileList } from "../../selectors";
import Decimal from "decimal.js";

const { Dragger } = Upload;


const { DirectoryTree } = Tree;


import './files.scss';
import FileActioner from "./fileactioner";


class Files extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        };
    }

    componentDidMount() {
        this.props.getFileList();
    }

    onSelect = (keys, event) => {
        this.setState({selected: event.node});
    };

    onExpand = () => {
        console.log('Trigger Expand');
    };

    render() {
        const props = {
          name: 'file',
          multiple: true,
          showUploadList: false,
          onChange(info) {
            const { status } = info.file;
          },
          // customRequest(e) {
          //     console.log(e);
          //     this.props.uploadFile(e.file.name, e.data);
          // }
        };

        const progress = new Decimal(this.props.upload_progress);

        return (
            <Row type="flex" justify="left" align="middle">
                <Col className={'p1 m1 panel'}>
                    <Row className={'m2'}>
                            <Button
                                type={'primary'}
                            >Local</Button>
                        </Row>
                        <Row className={'m2'}>
                            <Tooltip placement="right" title="not implemented]">
                                <Button
                                    disabled={true}
                                >SD</Button>
                            </Tooltip>
                        </Row>

                </Col>
                <Col span={6} style={{background: 'white', borderRadius:10}} className={'p1 m1'}>
                    <div className={'bold p1'}>Available Files</div>
                    <DirectoryTree
                      multiple
                      defaultExpandAll
                      onSelect={this.onSelect}
                      onExpand={this.onExpand}
                      treeData={this.props.local_files}
                    />
                </Col>
                <Col span={6} className={'p1 m1'}>
                    <div className={'m2 panel'}>
                        <div className={'bold p1'}>System Information</div>
                        <div>{bytes(this.props.local_free, {decimalPlaces: 0})} Free</div>
                        <div>{bytes(this.props.local_total, {decimalPlaces: 0})} Total</div>
                    </div>
                    {!this.state.selected ? '' : <FileActioner node={this.state.selected}/>    }

                </Col>
                <Col span={6} style={{background: 'white', borderRadius:10}} className={'p1 m1'}>
                    <Dragger {...props}
                             customRequest={(e) => {
                                 this.props.uploadFile(e.file.name, e.file)
                             }}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload.
                        </p>
                    </Dragger>
                    {this.props.upload_progress > 0 ? <Progress percent={progress.toDecimalPlaces(0)} /> : '' }
                </Col>
            </Row>
        )
    }
}

Files.defaultProps = {
    local_files: [],
    upload_progress: 0
};

function mapStateToProps(state) {
    return {
        local_files: showLocalFileList(state),
        upload_progress: state.files.upload_progress,
        local_free: state.files.free,
        local_total: state.files.total
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getFileList: actions.getFileList,
        uploadFile: actions.uploadFile,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Files);

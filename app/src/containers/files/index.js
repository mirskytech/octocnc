import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "antd/es/button/button";
import {Col, Tree, Row, Progress} from "antd";
import * as actions from "../../action_creators";
import bytes from "bytes";
import {randomBytes} from "crypto";
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import {showLocalFileList} from "../../selectors";
import Decimal from "decimal.js";

const { Dragger } = Upload;


const { DirectoryTree } = Tree;





const treeData = [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
    ],
  },
  {
    title: 'parent 2',
    key: '0-2',
    isLeaf: true
  },
{
    title: 'parent 3',
    key: '0-3',
    children: [
    ],
  },

];


class Files extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        this.props.getFileList();
    }

    onSelect = (keys, event) => {
        console.log('Trigger Select', keys, event);
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
                <Col span={6} style={{background: 'white', borderRadius:10}} className={'p1 m1'}>
                    {bytes(1024)}
                        <DirectoryTree
                          multiple
                          defaultExpandAll
                          onSelect={this.onSelect}
                          onExpand={this.onExpand}
                          treeData={this.props.local_files}
                        />
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
        upload_progress: state.files.upload_progress
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getFileList: actions.getFileList,
        uploadFile: actions.uploadFile
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Files);

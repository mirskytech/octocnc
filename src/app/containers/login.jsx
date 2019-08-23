import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {Form, Icon, Input, Button, Alert, Row, Col} from 'antd';
import {shouldHandleLogin} from "../selectors/index";
import {authLogin} from "../action_creators";
import {Redirect} from "react-router-dom";

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields();
        this.props.login(this.props.form.getFieldValue('userName'), this.props.form.getFieldValue('password'));
    };

    render() {

        if(this.props.authenticated) {
            return(<Redirect to={{pathname: '/'}} />);
        }
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        // Only show error after a field is touched.
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');

        return (
          <div>
              {/*{ this.props.authenticated && <Redirect to={{pathname: '/'}} />}*/}
              <h1>Login</h1>
              <Row>
                  <Col span={8}>col-8</Col>
                  <Col span={8}>
                      {this.props.message !== null && <Alert message={this.props.message} type="error"/>}
                  </Col>
                  <Col span={8}>col-8</Col>
              </Row>

              <Form layout="inline" onSubmit={this.handleSubmit}>
                  <FormItem
                    validateStatus={userNameError ? 'error' : ''}
                    help={userNameError || ''}
                  >
                      {getFieldDecorator('userName', {
                          rules: [{required: true, message: 'Please input your username!'}],
                      })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Username"/>
                      )}
                  </FormItem>
                  <FormItem
                    validateStatus={passwordError ? 'error' : ''}
                    help={passwordError || ''}
                  >
                      {getFieldDecorator('password', {
                          rules: [{required: true, message: 'Please input your Password!'}],
                      })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="Password"/>
                      )}
                  </FormItem>
                  <FormItem>
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                      >
                          Log in
                      </Button>
                  </FormItem>
              </Form>
          </div>
        );
    }
}

const mapStateToProps = () => {
    return (state, props) => {
        return {
            authenticated: !shouldHandleLogin()(state, props),
            message: state.auth.message
        }
    };
};

Login.defaultProps = {
    authenticated: false,
    message:null
};

Login.propTypes = {};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        login: authLogin
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login));
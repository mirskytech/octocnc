import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {Form, Icon, Input, Button} from 'antd';
import {shouldHandleLogin} from "../selectors";
import {authLogin} from "../action_creators";

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
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login()
            }
        });
    };

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        // Only show error after a field is touched.
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');

        return (
          <div>
              <h1>Login</h1>
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
            authenticated: shouldHandleLogin()(state, props)
        }
    };
};

Login.defaultProps = {};

Login.propTypes = {};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        login: authLogin
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login));
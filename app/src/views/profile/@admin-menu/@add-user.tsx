import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import { Form, Input, Switch, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { ServicesProps } from "../../../service-entrances";
import { computed } from "mobx";
import { User } from "../../../models/user";

const Wrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const { Option } = Select;

const FormWrapper = styled.div`
  flex: 1;
`;

interface AddUserProps extends FormComponentProps, ServicesProps {}

@inject("userService")
@observer
class _AddUser extends Component<AddUserProps> {
  @computed
  private get user(): User | undefined {
    return this.props.userService!.user;
  }

  render() {
    let {
      form: { getFieldDecorator }
    } = this.props;
    let user = this.user;

    if (!user) {
      return undefined;
    }

    return (
      <Wrapper>
        <FormWrapper>
          <Form>
            <Form.Item label="新成员用户名">
              {getFieldDecorator("username_new", {
                rules: [{ required: true, message: "请设置用户名" }]
              })(<Input addonAfter="@uicab.com" />)}
            </Form.Item>
            <Form.Item label="密码">
              {getFieldDecorator("password_new", {
                rules: [{ required: true, message: "请设置密码" }]
              })(<Input type="password" />)}
            </Form.Item>
            <Form.Item label="选择部门" hasFeedback>
              {getFieldDecorator("deptId_new", {
                rules: [{ required: true, message: "请选择部门" }]
              })(
                <Select placeholder="Please select a country">
                  <Option value="china">China</Option>
                  <Option value="usa">U.S.A</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="是否为管理员">
              {getFieldDecorator("isAdmin_new", { valuePropName: "checked" })(
                <Switch />
              )}
            </Form.Item>
          </Form>
        </FormWrapper>
      </Wrapper>
    );
  }

  validateFields = (): any | undefined => {
    let { form } = this.props;
    let result;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      result = values;
    });

    return result;
  };
}

export const AddUser = Form.create()(_AddUser);

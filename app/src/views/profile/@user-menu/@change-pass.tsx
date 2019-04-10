import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import { Form, Input } from "antd";
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

const FormWrapper = styled.div`
  flex: 1;
`;

interface ChangePassProps extends FormComponentProps, ServicesProps {}

@inject("userService")
@observer
class _ChangePass extends Component<ChangePassProps> {
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
            <Form.Item label="旧密码">
              {getFieldDecorator("old", {
                rules: [{ required: true, message: "请输入旧密码" }]
              })(<Input type="password" />)}
            </Form.Item>
            <Form.Item label="新密码">
              {getFieldDecorator("new", {
                rules: [{ required: true, message: "请输入新密码" }]
              })(<Input type="password" />)}
            </Form.Item>
            <Form.Item label="确认密码">
              {getFieldDecorator("confirm", {
                rules: [{ required: true, message: "请确认密码" }]
              })(<Input type="password" />)}
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

export const ChangePass = Form.create()(_ChangePass);

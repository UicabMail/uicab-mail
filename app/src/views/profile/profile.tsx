import React, { Component, FormEvent } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import { Form, Input, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { ServicesProps } from "../../service-entrances";
import { computed } from "mobx";
import { User } from "../../models/user";
import { AdminMenu } from "./@admin-menu";
import { UserMenu } from "./@user-menu";

const Wrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled.div`
  width: 40%;
`;

const MenuWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 10%;

  > * {
    margin-bottom: 24px;
  }
`;

const creat = Form.create;

interface ProfileProps extends FormComponentProps, ServicesProps {}

@inject("userService")
@observer
class Profile extends Component<ProfileProps> {
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

    let { id, mail, username, mobile, isAdmin } = user;

    return (
      <Wrapper>
        <FormWrapper>
          <Form onSubmit={this.onSubmit}>
            <Form.Item label="部门">
              <Input defaultValue="研发部" disabled />
            </Form.Item>
            <Form.Item label="编号">
              <Input type="number" defaultValue={`${id}`} disabled />
            </Form.Item>
            <Form.Item label="邮箱">
              <Input defaultValue={mail} disabled />
            </Form.Item>
            <Form.Item label="用户名">
              {getFieldDecorator("username", {
                initialValue: username,
                rules: [{ required: true, message: "请输入用户名" }]
              })(<Input placeholder="用户名" />)}
            </Form.Item>
            <Form.Item label="手机号">
              {getFieldDecorator("mobile", {
                initialValue: mobile,
                rules: [{ message: "请输入手机号" }]
              })(<Input placeholder="手机号" />)}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                保存修改
              </Button>
            </Form.Item>
          </Form>
        </FormWrapper>

        <MenuWrapper>
          <UserMenu />
          {isAdmin ? <AdminMenu /> : undefined}
        </MenuWrapper>
      </Wrapper>
    );
  }

  private onSubmit = (event: FormEvent): void => {
    let { form } = this.props;
    event.preventDefault();

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log({ ...this.user, ...values });
    });
  };
}

export const WrapperProfile = creat()(Profile);

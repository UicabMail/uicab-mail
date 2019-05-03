import React, { Component, FormEvent } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import { Form, Input, Button, message, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { ServicesProps } from "../../service-entrances";
import { computed } from "mobx";
import { User } from "../../models/user";
import { AdminMenu } from "./@admin-menu";
import { UserMenu } from "./@user-menu";
import { Department } from "../../models";

const { Option } = Select;

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

@inject("userService", "departmentService")
@observer
class Profile extends Component<ProfileProps> {
  private departmentService = this.props.departmentService!;

  @computed
  private get departments(): Department[] {
    return this.departmentService.departments;
  }

  @computed
  private get deptTitle(): string {
    let dept =
      this.user && this.departments.find(dept => dept.id === this.user!.id);

    return dept ? dept.name : "未知部门";
  }

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

    let { id, mail, username, mobile, isAdmin, dept } = user;

    return (
      <Wrapper>
        <FormWrapper>
          <Form onSubmit={this.onSubmit}>
            <Form.Item label="编号">
              <Input type="number" defaultValue={`${id}`} disabled />
            </Form.Item>
            <Form.Item label="邮箱">
              <Input defaultValue={mail} disabled />
            </Form.Item>
            <Form.Item label="部门" hasFeedback>
              {isAdmin ? (
                getFieldDecorator("dept", {
                  rules: [{ required: true, message: "请选择部门" }],
                  initialValue: String(dept)
                })(
                  <Select
                    showSearch
                    placeholder="选择部门"
                    optionFilterProp="children"
                    onFocus={() => {
                      this.departmentService.getDepartments();
                    }}
                    filterOption={(input, option) =>
                      (option.props.children as string)
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {this.departments.map(({ name, id }) => (
                      <Option key={`${id}`}>{name}</Option>
                    ))}
                  </Select>
                )
              ) : (
                <Input defaultValue={this.deptTitle} disabled />
              )}
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

  componentDidMount(): void {
    this.departmentService.getDepartments();

    let { userService } = this.props;
    userService!.on("UPDATE_USER", this.onUpdate);
  }

  componentWillUnmount(): void {
    let { userService } = this.props;

    userService!.off("UPDATE_USER", this.onUpdate);
  }

  private onUpdate = () => {
    message.success("信息修改成功");
  };

  private onSubmit = (event: FormEvent): void => {
    let { form, userService } = this.props;
    event.preventDefault();

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      userService!.updateProfile({ ...this.user, ...values });
    });
  };
}

export const WrapperProfile = creat()(Profile);

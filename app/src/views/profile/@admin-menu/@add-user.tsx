import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import { Form, Input, Switch, Select, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { ServicesProps } from "../../../service-entrances";
import { computed } from "mobx";
// import { User } from "../../../models/user";
import { Department, User } from "../../../models";

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

@inject("userService", "departmentService")
@observer
class _AddUser extends Component<AddUserProps> {
  private departmentService = this.props.departmentService!;

  private userService = this.props.userService!;

  @computed
  private get departments(): Department[] {
    return this.departmentService.departments;
  }

  render() {
    let {
      form: { getFieldDecorator }
    } = this.props;

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
              {getFieldDecorator("dept_new", {
                rules: [{ required: true, message: "请选择部门" }]
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
              )}
            </Form.Item>
            <Form.Item label="是否为管理员">
              {getFieldDecorator("isAdmin_new", {
                valuePropName: "checked",
                initialValue: false
              })(<Switch />)}
            </Form.Item>
          </Form>
        </FormWrapper>
      </Wrapper>
    );
  }

  componentDidMount(): void {
    this.userService.on("ADD_USER", this.onAddUser);
  }

  validateFields = (): any | undefined => {
    let { form } = this.props;
    let result;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      result = values;

      let user = {};

      for (let key in values) {
        user[key.replace("_new", "")] = values[key];
      }

      this.userService.create(user as User);
    });

    return result;
  };

  private onAddUser = (success: boolean): void => {
    console.log(success);

    if (success) {
      message.success("新增用户成功");
    }
  };
}

export const AddUser = Form.create()(_AddUser);

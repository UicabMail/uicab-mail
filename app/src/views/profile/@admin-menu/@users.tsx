import React, { Component, ReactNode, FormEvent } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import {
  Input,
  Empty,
  List,
  Select,
  Divider,
  Form,
  Button,
  Icon,
  Switch,
  message
} from "antd";
import { computed, action, observable, runInAction } from "mobx";
import { ServicesProps } from "../../../service-entrances";
import { User } from "../../../models/user";
import { FormComponentProps } from "antd/lib/form";
import { Department } from "../../../models";

type SetupType = "select" | "edit";

const SETUP_INFO: SetupType[] = ["select", "edit"];

const { Option } = Select;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > * {
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const EditWrapper = styled.div`
  flex: 1;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BlockButton = styled.span`
  color: red;
`;

const UnblockButton = styled.span`
  color: green;
`;

interface UsersProps extends ServicesProps, FormComponentProps {}

@inject("userService", "departmentService")
@observer
export class _Users extends Component<UsersProps> {
  @observable
  private setupIndex = 0;

  @observable
  private selectedUser: User | undefined;

  @observable
  private users: User[] = [];

  @observable
  private showPassInput = false;

  private departmentService = this.props.departmentService!;

  private userService = this.props.userService!;

  private keyword = "";

  @computed
  private get departments(): Department[] {
    return this.departmentService.departments;
  }

  @computed
  private get user(): User | undefined {
    return this.userService.user;
  }

  @computed
  private get setup(): SetupType {
    return SETUP_INFO[this.setupIndex];
  }

  @computed
  private get contentRendering(): ReactNode {
    switch (this.setup) {
      case "select":
        return this.selectRendering;
      case "edit":
        return this.editRendering;
      default:
        return undefined;
    }
  }

  @computed
  private get selectRendering(): ReactNode {
    let users = this.users;

    return users.length ? (
      <List
        itemLayout="horizontal"
        dataSource={users}
        renderItem={(user: User) => {
          let { id, username, mail, status } = user;

          if (id === this.user!.id) {
            return <></>;
          }

          return (
            <List.Item
              actions={[
                <div
                  onClick={() => {
                    runInAction(() => {
                      this.selectedUser = user;
                      this.setupIndex++;
                    });
                  }}
                >
                  编辑
                </div>,
                status ? (
                  <UnblockButton onClick={() => this.blockUser(id, 0)}>
                    解锁
                  </UnblockButton>
                ) : (
                  <BlockButton onClick={() => this.blockUser(id, 1)}>
                    锁定
                  </BlockButton>
                )
              ]}
            >
              <List.Item.Meta title={username} description={mail} />
              {status ? "账号冻结中" : "正常"}
            </List.Item>
          );
        }}
      />
    ) : (
      <Empty description="没有相关用户" />
    );
  }

  @computed
  private get editRendering(): ReactNode {
    let {
      form: { getFieldDecorator }
    } = this.props;

    let user = this.selectedUser;

    if (!user) {
      return undefined;
    }

    let { username, mobile, isAdmin, dept } = user;

    return (
      <EditWrapper>
        <Form onSubmit={this.onSubmit}>
          <Form.Item label="用户名">
            {getFieldDecorator("username_edit", {
              initialValue: username,
              rules: [{ required: true, message: "请输入用户名" }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="手机号">
            {getFieldDecorator("mobile_edit", {
              initialValue: mobile
            })(<Input />)}
          </Form.Item>
          <Form.Item label="选择部门" hasFeedback>
            {getFieldDecorator("dept_edit", {
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
            )}
          </Form.Item>
          <Form.Item label="是否为管理员">
            {getFieldDecorator("isAdmin_edit", {
              valuePropName: "checked",
              initialValue: isAdmin
            })(<Switch />)}
          </Form.Item>
          <Form.Item label="重置密码">
            <Switch onChange={this.onResetPassChange} />
          </Form.Item>
          {this.showPassInput ? (
            <Form.Item label="新密码">
              {getFieldDecorator("password_edit", {
                rules: [{ required: true, message: "请设置新密码" }]
              })(<Input type="password" />)}
            </Form.Item>
          ) : (
            undefined
          )}

          <ButtonWrapper>
            <Button type="primary" htmlType="submit">
              保存修改
            </Button>

            <Button type="danger" ghost onClick={this.onDeleteButtonClick}>
              删除用户
            </Button>
          </ButtonWrapper>
        </Form>
      </EditWrapper>
    );
  }

  @computed
  private get headerRendering(): ReactNode {
    let setup = this.setup;

    return (
      <Header>
        {setup !== "select" ? (
          <Button type="ghost" onClick={this.onBackClick}>
            <Icon type="left" />
            返回
          </Button>
        ) : (
          <Input.Search
            defaultValue={this.keyword}
            placeholder="请输入用户邮箱"
            onSearch={this.onInputSearch}
          />
        )}
      </Header>
    );
  }

  render() {
    let user = this.user;

    if (!user) {
      return undefined;
    }

    return (
      <Wrapper>
        {this.headerRendering}
        <Divider />
        {this.contentRendering}
      </Wrapper>
    );
  }

  componentDidMount(): void {
    this.departmentService.getDepartments();
    this.userService.on("SEARCH_USER", this.onSearchUser);
    this.userService.on("REMOVE_USER", this.onRemoveUser);
  }

  componentWillUnmount(): void {
    this.userService.off("SEARCH_USER", this.onSearchUser);
    this.userService.off("REMOVE_USER", this.onRemoveUser);
  }

  @action
  private onResetPassChange = (checked: boolean): void => {
    this.showPassInput = checked;
  };

  private onInputSearch = (value = this.keyword): void => {
    this.keyword = value;

    this.userService.searchUser(value);
  };

  private onSubmit = (event: FormEvent): void => {
    let { form } = this.props;

    event.preventDefault();

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      let user = {};

      for (let key in values) {
        user[key.replace("_edit", "")] = values[key];
      }

      this.userService.updateProfile({ id: this.selectedUser!.id, ...user });

      this.setSetupIndex(this.setupIndex - 1);

      this.onInputSearch();
    });
  };

  private onDeleteButtonClick = (): void => {
    this.userService.delete(this.selectedUser!);
  };

  private onBackClick = (): void => {
    if (this.setupIndex) {
      this.setSetupIndex(this.setupIndex - 1);
    }
  };

  private onRemoveUser = (): void => {
    message.success("删除用户成功");
    this.setSetupIndex(this.setupIndex - 1);

    this.onInputSearch();
  };

  @action
  private onSearchUser = (users: User[]) => {
    this.users = users;
  };

  @action
  private blockUser = (id: number, status: number): void => {
    this.userService.updateProfile({ id, status });

    this.onInputSearch();
  };

  @action
  private setSetupIndex(setupIndex: number): void {
    this.setupIndex = setupIndex;

    this.showPassInput = false;
  }

  validateFields = (): any | undefined => {};
}

export const Users = Form.create()(_Users);

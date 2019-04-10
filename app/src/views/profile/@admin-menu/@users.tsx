import React, { Component, ReactNode } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import { Input, Empty, List, Divider } from "antd";
import { ServicesProps } from "../../../service-entrances";
import { computed, action, observable } from "mobx";
import { User } from "../../../models/user";

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

const BlockButton = styled.span`
  color: red;
`;

interface UsersProps extends ServicesProps {}

@inject("userService")
@observer
export class Users extends Component<UsersProps> {
  @observable
  private users: User[] = [];

  @computed
  private get user(): User | undefined {
    return this.props.userService!.user;
  }

  @computed
  private get contentRendering(): ReactNode {
    let users = this.users;
    return users.length ? (
      <List
        itemLayout="horizontal"
        dataSource={users}
        renderItem={(user: User) => (
          <List.Item actions={["编辑", <BlockButton>冻结</BlockButton>]}>
            <List.Item.Meta title={user.username} description={user.mail} />
            正常
          </List.Item>
        )}
      />
    ) : (
      <Empty description="没有相关用户" />
    );
  }

  render() {
    let user = this.user;

    if (!user) {
      return undefined;
    }

    return (
      <Wrapper>
        <Input.Search placeholder="请输入用户邮箱" onSearch={this.onSearch} />
        <Divider />
        {this.contentRendering}
      </Wrapper>
    );
  }

  @action
  private onSearch = (value: string): void => {
    console.log(value);
    let user = this.user;
    this.users = value.length && user ? [user, user, user] : [];
  };

  validateFields = (): any | undefined => {};
}

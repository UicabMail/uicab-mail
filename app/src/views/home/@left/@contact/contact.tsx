import React, { Component, ReactNode } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import { Menu, Dropdown, Icon, Divider } from "antd";

import { UserList } from "./@user-list";
import { Chat } from "../../../../components/chat";
import { observable, action, autorun, computed } from "mobx";
import { User } from "../../../../models";
import { ServicesProps } from "../../../../service-entrances";
import { ClickParam } from "antd/lib/menu";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  text-align: center;
  cursor: pointer;
`;

type ChooseUserType = "all" | "dept" | "lately";

interface ChooseUserData {
  title: string;
  type: ChooseUserType;
}

const CHOOSE_USER_DATA: ChooseUserData[] = [
  { title: "最近联系人", type: "lately" },
  { title: "部门联系人", type: "dept" },
  { title: "所有用户", type: "all" }
];

const CHOOSE_USER_DATA_TYPE_TO_TITLE_MAP = new Map<ChooseUserType, string>(
  CHOOSE_USER_DATA.map(
    ({ title, type }): [ChooseUserType, string] => [type, title]
  )
);

interface ContactProps extends ServicesProps {}

@inject("userService", "messageService")
@observer
export class Contact extends Component<ContactProps> {
  @observable
  private visible = false;

  @observable
  private user: User | undefined;

  @observable
  private users: User[] = [];

  @observable
  private chooseType: ChooseUserType = "lately";

  private userService = this.props.userService!;

  private messageService = this.props.messageService!;

  @computed
  private get title(): string {
    return CHOOSE_USER_DATA_TYPE_TO_TITLE_MAP.get(this.chooseType)!;
  }

  private get menu(): ReactNode {
    return (
      <Menu
        style={{ width: "80%", marginLeft: "10%" }}
        onClick={this.onMenuClick}
      >
        {CHOOSE_USER_DATA.map(({ title, type }) => (
          <Menu.Item key={type}>{title}</Menu.Item>
        ))}
      </Menu>
    );
  }

  render() {
    return (
      <Wrapper>
        <Divider />
        <Dropdown overlay={this.menu}>
          <Header>
            {this.title} <Icon type="down" />
          </Header>
        </Dropdown>
        <UserList users={this.users} onUserClick={this.onUserClick} />
        {this.user ? (
          <Chat
            visible={this.visible}
            user={this.user}
            onClose={this.onChatClose}
          />
        ) : (
          undefined
        )}
      </Wrapper>
    );
  }

  componentDidMount(): void {
    this.userService.on("GET_USER", this.onGetUser);

    autorun(() => {
      switch (this.chooseType) {
        case "lately":
          this.getLately();
          break;
        case "dept":
          this.userService.getUser(false);
          break;
        case "all":
          this.userService.getUser(true);
          break;
      }
    });
  }

  componentWillUnmount(): void {
    this.userService.off("GET_USER", this.onGetUser);
  }

  @action
  private onMenuClick = ({ key }: ClickParam): void => {
    this.chooseType = key as ChooseUserType;
  };

  @action
  private onGetUser = (users: User[]): void => {
    this.users = users;
  };

  @action
  private onChatClose = (): void => {
    this.user = undefined;
    this.visible = false;
  };

  @action
  private onUserClick = (user: User): void => {
    this.user = user;
    this.visible = true;
  };

  @action
  private getLately(): void {
    this.users = this.messageService.getLately();
  }
}

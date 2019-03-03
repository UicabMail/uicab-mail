import React, { Component, ReactNode } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Menu, Dropdown, Icon, Divider } from "antd";

import { UserList } from "./@user-list";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const Header = styled.div`
  text-align: center;
  cursor: pointer;
`;

interface ContactProps {}

@observer
export class Contact extends Component<ContactProps> {
  private get menu(): ReactNode {
    return (
      <Menu style={{ width: "80%", marginLeft: "10%" }}>
        <Menu.Item>全部联系人</Menu.Item>
        <Menu.Divider />
        <Menu.Item>部门人员</Menu.Item>
        <Menu.Item>其他</Menu.Item>
      </Menu>
    );
  }

  render() {
    return (
      <Wrapper>
        <ContentWrapper>
          <Divider />
          <Dropdown overlay={this.menu}>
            <Header>
              最近联系人 <Icon type="down" />
            </Header>
          </Dropdown>
          <UserList />
        </ContentWrapper>
      </Wrapper>
    );
  }
}
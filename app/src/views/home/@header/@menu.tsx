import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import { Avatar, Icon, Tooltip } from "antd";
import { ServicesProps } from "../../../service-entrances";

const Wrapper = styled.div`
  width: 180px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`;

const UserAvatar = styled(Avatar)`
  display: block;
  margin: 0 4px;
  cursor: default;
`;

const MenuIcon = styled(Icon)`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin: 0 8px;
  cursor: pointer;
  border-radius: 50%;
  transition: backgroundColor 0.2s linear;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

interface MenuProps extends ServicesProps {}

@inject("userService")
@observer
export class Menu extends Component<MenuProps> {
  render() {
    return (
      <Wrapper>
        <Tooltip
          placement="bottomRight"
          title="退出登录"
          mouseEnterDelay={0.5}
          arrowPointAtCenter={true}
        >
          <MenuIcon type="logout" onClick={this.onLoginOutClick} />
        </Tooltip>
        <UserAvatar style={{ backgroundColor: "#009960" }} size={32}>
          B
        </UserAvatar>
      </Wrapper>
    );
  }

  private onLoginOutClick = (): void => {
    let { userService } = this.props;

    userService!.loginOut();
  };
}

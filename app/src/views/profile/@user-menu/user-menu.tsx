import React, { Component, ReactNode, createRef } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import { Dropdown, Menu, Button, Modal, message } from "antd";
import { observable, action, computed } from "mobx";
import { ChangePass } from "./@change-pass";
import { ServicesProps } from "../../../service-entrances";

const Wrapper = styled.div``;

interface UserMenuProps extends ServicesProps {}

type ActionType = "change-pass" | "logout";

@inject("userService")
@observer
export class UserMenu extends Component<UserMenuProps> {
  private modalContentRef = createRef<any>();

  @observable
  private modalVisible = false;

  @observable
  private action: ActionType | undefined;

  private userService = this.props.userService!;

  @computed
  private get modalContent(): ReactNode {
    switch (this.action) {
      case "change-pass":
        return <ChangePass wrappedComponentRef={this.modalContentRef} />;
      default:
        return undefined;
    }
  }

  @computed
  private get modalTitle(): string {
    switch (this.action) {
      case "change-pass":
        return "修改密码";
      default:
        return "";
    }
  }

  @computed
  private get modalRendering(): ReactNode {
    return (
      <Modal
        okText="确定"
        cancelText="取消"
        title={this.modalTitle}
        visible={this.modalVisible}
        onCancel={this.onCancel}
        onOk={this.onOk}
      >
        {this.modalContent}
      </Modal>
    );
  }

  render() {
    return (
      <Wrapper>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={() => this.onMenuItemClick("change-pass")}>
                修改密码
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item onClick={() => this.onMenuItemClick("logout")}>
                退出登录
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button type="primary" shape="circle" icon="setting" size="large" />
        </Dropdown>
        {this.modalRendering}
      </Wrapper>
    );
  }

  componentDidMount(): void {
    this.userService.on("CHANGE_PASS", this.onPasswordChange);
  }

  componentWillUnmount(): void {
    this.userService.off("CHANGE_PASS", this.onPasswordChange);
  }

  private onPasswordChange = (updated: boolean): void => {
    updated ? message.success("修改成功") : message.warning("密码错误修改失败");
  };

  @action
  private onMenuItemClick = (action: ActionType): void => {
    this.action = action;

    switch (action) {
      case "change-pass":
        this.modalVisible = true;
        break;
      case "logout":
        console.log("退出登录");
        break;
    }
  };

  @action
  private onCancel = (): void => {
    this.modalVisible = false;
  };

  private onOk = (): void => {
    let current = this.modalContentRef.current!;
    let content =
      "wrappedInstance" in current ? current.wrappedInstance : current;

    switch (this.action) {
      case "change-pass":
        let values = content.validateFields();

        if (values) {
          this.changePass(values);
        }
        break;
    }
  };

  private changePass(values: any): void {
    let { old: oldPass, new: newPass, confirm: confirmPass } = values;

    if (newPass !== confirmPass) {
      return void message.warning("两次密码不一致");
    }

    this.userService.changePass(oldPass, newPass);
  }
}

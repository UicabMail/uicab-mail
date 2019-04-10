import React, { Component, ReactNode, createRef } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Dropdown, Menu, Button, Modal } from "antd";
import { observable, computed, action } from "mobx";
import { AddUser } from "./@add-user";
import { Users } from "./@users";
import { Departments } from "./@departments";

const Wrapper = styled.div``;

interface AdminMenuProps {}

type ActionType = "add" | "users" | "departments";

@observer
export class AdminMenu extends Component<AdminMenuProps> {
  private modalContentRef = createRef<any>();

  @observable
  private modalVisible = false;

  @observable
  private action: ActionType | undefined;

  @computed
  private get modalContent(): ReactNode {
    switch (this.action) {
      case "add":
        return <AddUser wrappedComponentRef={this.modalContentRef} />;
      case "users":
        return <Users ref={this.modalContentRef} />;
      case "departments":
        return <Departments />;
      default:
        return undefined;
    }
  }

  @computed
  private get modalTitle(): string {
    switch (this.action) {
      case "add":
        return "添加成员";
      case "users":
        return "成员管理";
      case "departments":
        return "部门管理";
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
              <Menu.Item onClick={() => this.onMenuItemClick("add")}>
                添加新成员
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item onClick={() => this.onMenuItemClick("users")}>
                成员管理
              </Menu.Item>
              <Menu.Item onClick={() => this.onMenuItemClick("departments")}>
                部门管理
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button
            type="primary"
            shape="circle"
            icon="usergroup-add"
            size="large"
          />
        </Dropdown>
        {this.modalRendering}
      </Wrapper>
    );
  }

  @action
  private onMenuItemClick = (action: ActionType): void => {
    this.action = action;
    this.modalVisible = true;
  };

  @action
  private onCancel = (): void => {
    this.modalVisible = false;
  };

  private onOk = (): void => {
    let current = this.modalContentRef.current!;
    let content =
      "wrappedInstance" in current ? current.wrappedInstance : current;

    let values = content.validateFields();
    console.log(values);

    switch (this.action) {
    }
  };
}

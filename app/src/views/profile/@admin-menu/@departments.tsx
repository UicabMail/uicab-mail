import React, { Component, ReactNode } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import { Select, Button, Icon } from "antd";
import { computed, observable, action } from "mobx";

import { ServicesProps } from "../../../service-entrances";
import { User, Department } from "../../../models";

type SetupType = "select" | "edit" | "move";

const SETUP_INFO: SetupType[] = ["select", "edit", "move"];

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

interface DepartmentsProps extends ServicesProps {}

@inject("userService")
@observer
export class Departments extends Component<DepartmentsProps> {
  @observable
  private setupIndex = 0;

  @observable
  private selectedDepartment: Department | undefined;

  @computed
  private get setup(): SetupType {
    return SETUP_INFO[this.setupIndex];
  }

  @computed
  private get user(): User | undefined {
    return this.props.userService!.user;
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
          undefined
        )}

        {setup === "edit" ? (
          <Button type="primary" onClick={this.onMoveUserClick}>
            <Icon type="users" />
            成员调整
          </Button>
        ) : (
          undefined
        )}
      </Header>
    );
  }

  @computed
  private get contentRendering(): ReactNode {
    switch (this.setup) {
      case "select":
        return this.selectRendering;
      case "edit":
        return this.editRendering;
      case "move":
        return this.moveRendering;

      default:
        return undefined;
    }
  }

  @computed
  private get selectRendering(): ReactNode {
    let Option = Select.Option;

    return (
      <Select
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={this.onChange}
        filterOption={(input, option) =>
          (option.props.children as string)
            .toLowerCase()
            .indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="tom">Tom</Option>
      </Select>
    );
  }

  @computed
  private get editRendering(): ReactNode {
    let department = this.selectedDepartment;

    return department && department.name;
  }

  @computed
  private get moveRendering(): ReactNode {
    return "移动";
  }

  render() {
    let user = this.user;

    if (!user) {
      return undefined;
    }

    return (
      <Wrapper>
        {this.headerRendering}
        {this.contentRendering}
      </Wrapper>
    );
  }

  validateFields = (): any | undefined => {};

  private onChange = (value: string): void => {
    console.log(value);
    if (value) {
      this.setSetupIndex(this.setupIndex + 1);
      this.setSelectedDepartment({
        id: 1,
        ownerId: 1,
        name: "研发部",
        placard: "大家加油"
      });
    }
  };

  private onBackClick = (): void => {
    if (this.setupIndex) {
      this.setSetupIndex(this.setupIndex - 1);
    }
  };

  private onMoveUserClick = (): void => {
    this.setSetupIndex(this.setupIndex + 1);
  };

  @action
  private setSetupIndex(setupIndex: number): void {
    this.setupIndex = setupIndex;
  }

  @action
  private setSelectedDepartment(
    selectedDepartment: Department | undefined
  ): void {
    this.selectedDepartment = selectedDepartment;
  }
}

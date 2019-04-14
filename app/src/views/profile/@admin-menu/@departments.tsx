import React, { Component, ReactNode } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import { Select, Button, Icon, Form, Input, Transfer } from "antd";
import { computed, observable, action } from "mobx";

import { ServicesProps } from "../../../service-entrances";
import { User, Department } from "../../../models";
import { FormComponentProps } from "antd/lib/form";

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

const EditWrapper = styled.div`
  flex: 1;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface DepartmentsProps extends ServicesProps, FormComponentProps {}

@inject("userService")
@observer
export class _Departments extends Component<DepartmentsProps> {
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

        {/* TODO */}
        {/* {setup === "edit" ? (
          <Button type="primary" onClick={this.onMoveUserClick}>
            <Icon type="users" />
            成员调整
          </Button>
        ) : (
          undefined
        )} */}
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
    let {
      form: { getFieldDecorator }
    } = this.props;
    let department = this.selectedDepartment;

    if (!department) {
      return undefined;
    }

    let { id, placard, name } = department;

    return (
      <EditWrapper>
        <Form>
          <Form.Item label="部门编号">
            <Input defaultValue={`${id}`} disabled />
          </Form.Item>
          <Form.Item label="部门名称">
            {getFieldDecorator("dept_name", {
              initialValue: name,
              rules: [{ required: true, message: "请输入部门名称" }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="部门公告">
            {getFieldDecorator("dept_placard", {
              initialValue: placard
            })(<Input />)}
          </Form.Item>
          <ButtonWrapper>
            <Button type="primary" htmlType="submit">
              保存修改
            </Button>
            <Button type="danger" ghost onClick={this.onDeleteButtonClick}>
              删除部门
            </Button>
          </ButtonWrapper>
        </Form>
      </EditWrapper>
    );
  }

  @computed
  private get moveRendering(): ReactNode {
    // TODO
    return (
      <Transfer
        dataSource={[]}
        showSearch
        // filterOption={this.filterOption}
        // targetKeys={this.state.targetKeys}
        // onChange={this.handleChange}
        // onSearch={this.handleSearch}
        // render={item => item.title}
      />
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

  private onDeleteButtonClick = (): void => {};

  private onBackClick = (): void => {
    if (this.setupIndex) {
      this.setSetupIndex(this.setupIndex - 1);
    }
  };

  // private onMoveUserClick = (): void => {
  //   this.setSetupIndex(this.setupIndex + 1);
  // };

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

export const Departments = Form.create()(_Departments);

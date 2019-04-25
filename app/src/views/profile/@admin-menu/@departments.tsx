import React, { Component, ReactNode, FormEvent } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import { Select, Button, Icon, Form, Input, Transfer, message } from "antd";
import { computed, observable, action } from "mobx";

import { ServicesProps } from "../../../service-entrances";
import { User, Department } from "../../../models";
import { FormComponentProps } from "antd/lib/form";

type SetupType = "select" | "edit" | "move";

type EditType = "create" | "update";

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

@inject("userService", "departmentService")
@observer
export class _Departments extends Component<DepartmentsProps> {
  @observable
  private setupIndex = 0;

  @observable
  private selectedDepartment: Department | undefined;

  @observable
  private editMode: EditType = "update";

  private departmentService = this.props.departmentService!;

  private initDepartment = {
    id: Date.now(),
    name: "",
    placard: "",
    owner: this.user.id
  } as Department;

  private createDepartment = { ...this.initDepartment };

  @computed
  private get departmentIdToDepartmentMap(): Map<string, Department> {
    return new Map(
      this.departments.map(
        (department): [string, Department] => [`${department.id}`, department]
      )
    );
  }

  @computed
  private get department(): Department | undefined {
    return this.editMode === "create"
      ? this.createDepartment
      : this.selectedDepartment;
  }

  @computed
  private get departments(): Department[] {
    return this.departmentService.departments;
  }

  @computed
  private get setup(): SetupType {
    return SETUP_INFO[this.setupIndex];
  }

  @computed
  private get user(): User {
    return this.props.userService!.user!;
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
      <>
        <Button
          type="primary"
          style={{ marginBottom: "20px" }}
          onClick={this.onCreateButtonClick}
        >
          新增部门
        </Button>
        <Select
          showSearch
          placeholder="选择部门"
          optionFilterProp="children"
          onChange={this.onSelectChange}
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
      </>
    );
  }

  @computed
  private get editRendering(): ReactNode {
    let {
      form: { getFieldDecorator }
    } = this.props;

    let department = this.department;

    if (!department) {
      return undefined;
    }

    let { id, placard, name } = department;
    let isUpdate = this.editMode !== "create";

    return (
      <EditWrapper>
        <Form onSubmit={this.onSubmit}>
          {isUpdate ? (
            <Form.Item label="部门编号">
              <Input defaultValue={`${id}`} disabled />
            </Form.Item>
          ) : (
            undefined
          )}
          <Form.Item label="部门名称">
            {getFieldDecorator("name", {
              initialValue: name,
              rules: [{ required: true, message: "请输入部门名称" }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="部门公告">
            {getFieldDecorator("placard", {
              initialValue: placard
            })(<Input />)}
          </Form.Item>
          <ButtonWrapper>
            <Button type="primary" htmlType="submit">
              {isUpdate ? "保存修改" : "创建部门"}
            </Button>

            {isUpdate ? (
              <Button type="danger" ghost onClick={this.onDeleteButtonClick}>
                删除部门
              </Button>
            ) : (
              undefined
            )}
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

  componentDidMount(): void {
    this.departmentService.on("ADD_DEPT", this.onAddDept);
    this.departmentService.on("UPDATE_DEPT", this.onUpdateDept);
    this.departmentService.on("REMOVE_DEPT", this.onRemoveDept);
  }

  componentWillUnmount(): void {
    this.departmentService.off("ADD_DEPT", this.onAddDept);
    this.departmentService.off("UPDATE_DEPT", this.onUpdateDept);
    this.departmentService.off("REMOVE_DEPT", this.onRemoveDept);
  }

  private onAddDept = (): void => {
    message.success("新增部门成功");
    this.createDepartment = { ...this.initDepartment };
    this.props.form.resetFields();
  };

  private onUpdateDept = (): void => {
    message.success("更新部门成功");
  };

  private onRemoveDept = (): void => {
    message.success("删除部门成功");
    this.onBackClick();
  };

  private onCreateButtonClick = (): void => {
    this.setSetupIndex(this.setupIndex + 1);
    this.setEditMode("create");
  };

  private onSubmit = (event: FormEvent): void => {
    let { form } = this.props;

    event.preventDefault();

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      if (this.editMode === "create") {
        this.departmentService.create({ ...values, owner: this.user.id });
      } else {
        this.departmentService.update({
          ...this.selectedDepartment,
          ...values
        });
      }
    });
  };

  private onSelectChange = (id: string): void => {
    if (id) {
      this.setSetupIndex(this.setupIndex + 1);
      this.setSelectedDepartment(this.departmentIdToDepartmentMap.get(id));
    }
  };

  private onDeleteButtonClick = (): void => {
    this.departmentService.delete(this.selectedDepartment!);
  };

  private onBackClick = (): void => {
    if (this.setupIndex) {
      this.setSetupIndex(this.setupIndex - 1);
    }

    if (this.editMode === "create") {
      this.setEditMode("update");
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
  private setEditMode(editMode: EditType): void {
    this.editMode = editMode;
  }

  @action
  private setSelectedDepartment(
    selectedDepartment: Department | undefined
  ): void {
    this.selectedDepartment = selectedDepartment;
  }
}

export const Departments = Form.create()(_Departments);

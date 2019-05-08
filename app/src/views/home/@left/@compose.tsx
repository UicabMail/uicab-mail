import React, { Component, FormEvent } from "react";
import { observer, inject } from "mobx-react";
import { Form, Input, Button, Drawer, message, Spin } from "antd";
import styled from "styled-components";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ServicesProps } from "../../../service-entrances";
import { FormComponentProps } from "antd/lib/form";
import { Mail } from "../../../models";
import { observable, action, runInAction } from "mobx";

interface ComposeProps
  extends RouteComponentProps,
    ServicesProps,
    FormComponentProps {
  visible: boolean;
  onClose(): void;
}

const DrawerTitle = styled.div`
  > * {
    margin-left: 10px;
  }
`;

@inject("mailService")
@observer
class _Compose extends Component<ComposeProps> {
  @observable
  private sending = false;

  private mailService = this.props.mailService!;

  render() {
    let {
      visible,
      form: { getFieldDecorator }
    } = this.props;

    return (
      <Drawer
        width={480}
        title={
          <DrawerTitle>
            快捷邮件
            <Button type="dashed" size="small" onClick={this.onEditButtonClick}>
              完整模式
            </Button>
          </DrawerTitle>
        }
        placement="right"
        mask={false}
        onClose={this.onClose}
        visible={visible}
      >
        <Spin tip="邮件发送中..." spinning={this.sending}>
          <Form onSubmit={this.onSubmit}>
            <Form.Item label="收件人">
              {getFieldDecorator("to", {
                rules: [{ required: true, message: "请输入收件人邮箱地址" }]
              })(<Input placeholder="请输入收件人" />)}
            </Form.Item>
            <Form.Item label="主题">
              {getFieldDecorator("subject", {
                rules: [{ required: true, message: "请输入邮件主题" }]
              })(<Input placeholder="请输入主题" />)}
            </Form.Item>
            <Form.Item label="内容">
              {getFieldDecorator("content", {
                rules: [{ required: true, message: "请输入邮件内容" }]
              })(<Input.TextArea placeholder="请输入内容" rows={6} />)}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                icon="upload"
                size="large"
                htmlType="submit"
              >
                发送邮件
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Drawer>
    );
  }

  componentDidMount(): void {
    this.mailService.on("SEND", this.onMailSended);
  }

  @action
  private onMailSended = (sended: boolean): void => {
    sended
      ? message.success("邮件发送成功")
      : message.warning("邮件发送失败，请重试");

    this.sending = false;
  };

  private onSubmit = (event: FormEvent): void => {
    let { form } = this.props;

    event.preventDefault();

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      this.mailService.send(values as Mail);

      runInAction(() => (this.sending = true));
    });
  };

  private onEditButtonClick = (): void => {
    let { history, onClose } = this.props;
    history.push("edit");
    onClose();
  };

  private onClose = (): void => {
    let { onClose } = this.props;
    onClose();
  };
}

export const Compose = withRouter(Form.create()(_Compose));

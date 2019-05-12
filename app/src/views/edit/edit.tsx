import React, { Component, createRef, FormEvent } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import { Mail } from "../../models/mail";
import { MailEditor } from "../../components";
import { Form, Input, Button, Spin } from "antd";
import { ServicesProps } from "../../service-entrances";
import { FormComponentProps } from "antd/lib/form";
import { computed, observable, runInAction, action } from "mobx";
import { RouteComponentProps } from "react-router-dom";

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  box-sizing: border-box;
  padding: 24px 15%;
  flex: 1;
  overflow: auto;
`;

const SendWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 10%;
  right: 8%;

  > button {
    width: 54px;
    height: 54px;
    font-size: 32px;
    margin-bottom: 12px;
  }
`;

interface EditProps
  extends ServicesProps,
    FormComponentProps,
    RouteComponentProps {
  mail: Mail;
}

@inject("mailService")
@observer
export class _Edit extends Component<EditProps> {
  @observable
  private sending = false;

  private mailService = this.props.mailService!;

  private editorRef = createRef<MailEditor>();

  private get editor(): MailEditor {
    return this.editorRef.current!;
  }

  @computed
  private get editingMail(): Mail | undefined {
    return this.mailService.editing;
  }

  render() {
    let {
      form: { getFieldDecorator }
    } = this.props;

    let editingMail = this.editingMail;

    return (
      <Wrapper>
        <Form onSubmit={this.onSubmit}>
          <Spin tip="邮件发送中..." spinning={this.sending}>
            <Content>
              <Form.Item label="收件人">
                {getFieldDecorator("to", {
                  rules: [{ required: true, message: "请输入收件人邮箱地址" }],
                  initialValue: editingMail && editingMail.to
                })(<Input placeholder="请输入收件人" />)}
              </Form.Item>
              <Form.Item label="主题">
                {getFieldDecorator("subject", {
                  rules: [{ required: true, message: "请输入邮件主题" }],
                  initialValue: editingMail && editingMail.subject
                })(<Input placeholder="请输入主题" />)}
              </Form.Item>
              <Form.Item label="内容">
                <MailEditor
                  ref={this.editorRef}
                  initContent={editingMail && editingMail.content}
                />
              </Form.Item>
            </Content>
            <SendWrapper>
              <Button
                type="primary"
                shape="circle"
                icon="twitter"
                htmlType="submit"
              />

              <Button
                type="dashed"
                shape="circle"
                icon="edit"
                onClick={this.saveDraft}
              />
            </SendWrapper>
          </Spin>
        </Form>
      </Wrapper>
    );
  }

  componentDidMount(): void {
    this.mailService.on("SEND", this.onMailSended);
  }

  componentWillUnmount(): void {
    this.mailService.off("SEND", this.onMailSended);
  }

  @action
  private onMailSended = (sended: boolean): void => {
    let { form } = this.props;

    if (sended) {
      form.resetFields();
    }

    this.sending = false;
  };

  private saveDraft = (): void => {
    let { form, history } = this.props;

    let values = form.getFieldsValue() as Mail;

    values.content = this.editor.getValue() || "";

    values.contentType = "html";

    values.seen = true;

    this.mailService.saveDraft(values);

    history.push("draft");
  };

  private onSubmit = (event: FormEvent): void => {
    let { form } = this.props;

    event.preventDefault();

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      values.content = this.editor.getValue();

      this.mailService.send(values as Mail, true);

      runInAction(() => (this.sending = true));
    });
  };
}

export const Edit = Form.create()(_Edit);

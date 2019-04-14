import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Mail } from "../../models/mail";
import { MailEditor } from "../../components";
import { Form, Input, Button } from "antd";

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  padding: 24px 15%;
  height: 100%;
  overflow: auto;
`;

const SendWrapper = styled.div`
  position: absolute;
  top: 10%;
  right: 10%;

  > button {
    width: 54px;
    height: 54px;
    font-size: 32px;
  }
`;

interface EditProps {
  mail: Mail;
}

@observer
export class Edit extends Component<EditProps> {
  render() {
    return (
      <Wrapper>
        <Content>
          <Form>
            <Form.Item label="发件人">
              <Input placeholder="请输入发件人" />
            </Form.Item>
            <Form.Item label="收件人">
              <Input placeholder="请输入收件人" />
            </Form.Item>
            <Form.Item label="主题">
              <Input placeholder="请输入主题" />
            </Form.Item>
            <Form.Item label="内容">
              <MailEditor />
            </Form.Item>
          </Form>
        </Content>
        <SendWrapper>
          <Button type="primary" shape="circle" icon="twitter" />
        </SendWrapper>
      </Wrapper>
    );
  }
}

import React, { Component } from "react";
import { observer } from "mobx-react";
import { Form, Input, Button, Drawer } from "antd";
import styled from "styled-components";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface ComposeProps extends RouteComponentProps {
  visible: boolean;
  onClose(): void;
}

const DrawerTitle = styled.div`
  > * {
    margin-left: 10px;
  }
`;

@observer
class _Compose extends Component<ComposeProps> {
  render() {
    let { visible } = this.props;
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
            <Input.TextArea placeholder="请输入内容" rows={6} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon="upload" size="large">
              发送邮件
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    );
  }

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

export const Compose = withRouter(_Compose);

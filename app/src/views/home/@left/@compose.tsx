import React, { Component } from "react";
import { observer } from "mobx-react";
import { Form, Input, Button, Drawer } from "antd";

interface ComposeProps {
  visible: boolean;
  onClose(): void;
}

@observer
export class Compose extends Component<ComposeProps> {
  render() {
    let { visible } = this.props;
    return (
      <Drawer
        width={480}
        title="邮件编写"
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

  private onClose = (): void => {
    let { onClose } = this.props;
    onClose();
  };
}

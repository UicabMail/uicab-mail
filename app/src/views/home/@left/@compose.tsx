import React, { Component } from "react";
import { observer } from "mobx-react";
// import styled from "styled-components";
import { Drawer } from "antd";

// const Wrapper = styled.div``;

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
        <p>施工中...</p>
        <p>慢慢来...</p>
        <p>不着急...</p>
      </Drawer>
    );
  }

  private onClose = (): void => {
    let { onClose } = this.props;
    onClose();
  };
}

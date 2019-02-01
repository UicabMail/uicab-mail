import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Drawer } from "antd";

const Wrapper = styled(Drawer)``;

interface ComposeProps {
  visible: boolean;
  onClose(): void;
}

@observer
export class Compose extends Component<ComposeProps> {
  render() {
    let { visible } = this.props;
    return (
      <Wrapper
        width={"50%"}
        title="邮件编写"
        placement="right"
        onClose={this.onClose}
        visible={visible}
      >
        <p>施工中...</p>
        <p>慢慢来...</p>
        <p>不着急...</p>
      </Wrapper>
    );
  }

  private onClose = (): void => {
    let { onClose } = this.props;
    onClose();
  };
}

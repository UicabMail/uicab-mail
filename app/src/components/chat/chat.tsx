import React, { Component, ReactNode } from "react";
import styled from "styled-components";
import { User, Message } from "../../models";
import { Modal, Input } from "antd";
import { computed } from "mobx";
import { Item } from "./@item";

const { TextArea } = Input;

const Wrapper = styled.div``;

const Content = styled.div`
  max-height: 480px;
  overflow: auto;
`;

const MOCK_MESSAGES: Message[] = [
  { user: "1", content: "你好" },
  { user: "2", content: "你好~" },
  { user: "1", content: "最近怎么样" }
];

export interface ChatProps {
  visible: boolean;
  user: User;
}
export class Chat extends Component<ChatProps> {
  @computed
  private get footerRendering(): ReactNode {
    return <TextArea placeholder="请输入消息（回车键发送）" rows={4} />;
  }

  render() {
    let {
      visible,
      user: { username }
    } = this.props;

    return (
      <Wrapper>
        <Modal
          title={`${username} (在线)`}
          visible={visible}
          footer={this.footerRendering}
          mask={false}
          width="70%"
          bodyStyle={{ padding: 0 }}
        >
          <Content>
            {MOCK_MESSAGES.map((message, index) => (
              <Item message={message} key={index} />
            ))}
            {MOCK_MESSAGES.map((message, index) => (
              <Item message={message} key={index} />
            ))}
            {MOCK_MESSAGES.map((message, index) => (
              <Item message={message} key={index} />
            ))}
            {MOCK_MESSAGES.map((message, index) => (
              <Item message={message} key={index} />
            ))}
          </Content>
        </Modal>
      </Wrapper>
    );
  }
}

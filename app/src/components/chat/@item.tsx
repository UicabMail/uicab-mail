import React, { Component } from "react";
import styled from "styled-components";
import { Message } from "../../models";
import { Avatar } from "antd";

const Name = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 2%;

  & > :first-child {
    margin: 0 8px;
  }
`;

const Text = styled.div`
  padding: 4px 4%;
  font-size: 14px;
  min-width: 140px;
  border-radius: 6px;
`;

const Wrapper = styled.div`
  &.left {
    display: flex;
    align-items: center;

    ${Text} {
      background-color: #1890ff;
      color: #fff;
    }
  }

  &.right {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;

    ${Name} {
      flex-direction: row-reverse;
    }

    ${Text} {
      background-color: #eee;
    }
  }
`;

export interface ItemProps {
  message: Message;
}

export class Item extends Component<ItemProps> {
  render() {
    let { message } = this.props;

    return (
      <Wrapper className={message.user === "1" ? "left" : "right"}>
        <Name>
          <Avatar src="https://avatars0.githubusercontent.com/u/33797740?s=460&v=4" />
          测试用户{message.user}
        </Name>
        <Text>{message.content}</Text>
      </Wrapper>
    );
  }
}

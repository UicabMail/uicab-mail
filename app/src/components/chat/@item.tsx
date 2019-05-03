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
  min-width: 60px;
  min-height: 29px;
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
  name: string;
  message: Message;
}

export class Item extends Component<ItemProps> {
  render() {
    let {
      name,
      message: { content, current }
    } = this.props;

    return (
      <Wrapper className={!current ? "left" : "right"}>
        <Name>
          <Avatar src="https://avatars0.githubusercontent.com/u/33797740?s=460&v=4" />
          {current ? "我" : name}
        </Name>
        <Text>{content}</Text>
      </Wrapper>
    );
  }
}

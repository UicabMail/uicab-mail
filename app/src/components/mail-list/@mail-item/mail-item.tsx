import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Checkbox, Icon as _Icon, List } from "antd";
// import { Mail } from "shared";

const Icon = styled(_Icon)`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-left: 1em;
  color: #202124;
  opacity: 0.16;
  cursor: pointer;

  &:hover&:hover {
    opacity: 1;
  }
`;

const Title = styled.div`
  width: 25%;
  padding-left: 1em;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
`;

const Text = styled.div`
  flex: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Menu = styled.div`
  display: none;
  min-width: 20%;
`;

const Date = styled.div`
  min-width: 12%;
`;

const Wrapper = styled(List.Item)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;

  & > :first-child {
    margin-left: 2%;
  }

  & > :last-child {
    margin-right: 2%;
  }

  &:hover {
    box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0,
      0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);

    ${Menu} {
      display: flex;
    }

    ${Date} {
      display: none;
    }

    ${Icon} {
      opacity: 0.4;
    }
  }
`;

interface MailItemProps {
  mail: any;
}

@observer
export class MailItem extends Component<MailItemProps> {
  render() {
    return (
      <Wrapper>
        <Checkbox />
        <Icon type="star" title="星标" />
        <Icon type="tag" title="标记" />
        <Title>11</Title>
        <Content>
          <Text>
            1131232131asdas试试暗杀实打实大苏打撒旦啊实打实大苏打啊大苏打撒旦sssss
          </Text>
          <Menu>
            <Icon type="delete" />
          </Menu>
          <Date>23点41分</Date>
        </Content>
      </Wrapper>
    );
  }
}

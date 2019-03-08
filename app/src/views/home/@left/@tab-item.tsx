import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Badge as _Badge } from "antd";
import classNames from "classnames";

import { IconFont as _Icon } from "../../../components";

const Wrapper = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  padding: 0 10px 0 24px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &.active {
    font-weight: bold;
    color: rgba(93, 179, 255);
    background-color: rgba(230, 247, 255);
  }
`;

const Badge = styled(_Badge)``;

const Icon = styled(_Icon)`
  font-size: 18px;
`;

const ItemText = styled.div`
  flex: 1;
  padding: 0 20px;
`;

interface TabItemProps {
  active: boolean;
  icon: string;
  text: string;
  count?: number;
}

@observer
export class TabItem extends Component<TabItemProps> {
  render() {
    let { active, count, icon, text } = this.props;
    return (
      <Wrapper className={classNames({ active })}>
        <Icon type={icon} />
        <ItemText>{text}</ItemText>
        {count && !active ? <Badge count={count} /> : undefined}
      </Wrapper>
    );
  }
}

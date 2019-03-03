import { Checkbox, Icon as _Icon, Popover } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React, { Component, ReactNode } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { computed } from "mobx";

const Wrapper = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2%;
  box-shadow: inset 0 -1px 0 0 rgba(100, 121, 143, 0.2);
`;

const Icon = styled(_Icon)`
  cursor: pointer;
  font-weight: 900;
  font-size: 16px;
  margin-left: 1em;
`;

const Menu = styled.div``;

const PageInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const PageInfo = styled.div``;

interface HeaderProps {
  total: number;
  count: number;
  onCheckedAll(checked: boolean): void;
  onReload(): void;
}

@observer
export class Header extends Component<HeaderProps> {
  @computed
  private get popoverContent(): ReactNode {
    return "hello";
  }

  render() {
    let { total, count, onReload } = this.props;

    return (
      <Wrapper>
        <Menu>
          <Checkbox
            indeterminate={!!count && count < total}
            onChange={this.onChange}
            checked={count === total}
          />

          <Icon type="reload" onClick={onReload} />

          <Popover placement="rightTop" content={this.popoverContent}>
            <Icon type="bars" />
          </Popover>
        </Menu>

        <PageInfoWrapper>
          <PageInfo>第 1 页 / 共 20 页</PageInfo>
          <Icon type="left" />
          <Icon type="right" />
        </PageInfoWrapper>
      </Wrapper>
    );
  }

  private onChange = ({ target: { checked } }: CheckboxChangeEvent) => {
    let { onCheckedAll } = this.props;
    onCheckedAll(checked);
  };
}

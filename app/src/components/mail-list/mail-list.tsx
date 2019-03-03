import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Header } from "./@header";
import { List as _List } from "antd";
import { MailItem } from "./@mail-item";

const Wrapper = styled.div`
  height: 100%;
`;

const List = styled(_List)`
  height: calc(100% - 48px);
  overflow: auto;
`;

const Footer = styled.div`
  text-align: center;
`;

interface MailListProps {
  mails: any[];
}

@observer
export class MailList extends Component<MailListProps> {
  render() {
    return (
      <Wrapper>
        <Header
          total={2}
          count={1}
          onCheckedAll={this.onCheckedAll}
          onReload={this.onReload}
        />
        <List
          footer={<Footer>最近登录 00点19分</Footer>}
          dataSource={Array(30)}
          renderItem={(item: any) => <MailItem mail={item} />}
        />
      </Wrapper>
    );
  }

  private onCheckedAll = (checked: boolean): void => {
    console.info(checked);
  };

  private onReload = (): void => {
    console.info();
  };
}

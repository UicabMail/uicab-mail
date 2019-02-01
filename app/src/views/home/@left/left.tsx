import React, { Component, ReactNode } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { TabItem } from "./@tab-item";
import { Button } from "antd";
import { Contact } from "./@contact";
import { Compose } from "./@compose";
import { observable, action } from "mobx";

const Wrapper = styled.div`
  width: 256px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ComposeWrapper = styled.div`
  padding: 24px 0;
  display: flex;
  justify-content: center;
`;

const Tabs = styled.div``;

const TAB_ITEMS: ItemData[] = [
  {
    icon: "user",
    text: "工作邮件"
  },
  {
    icon: "user",
    text: "收件箱"
  },
  {
    icon: "user",
    text: "已加星标"
  },
  {
    icon: "user",
    text: "已发邮件"
  },
  {
    icon: "user",
    text: "草稿"
  }
];

interface ItemData {
  icon: string;
  text: string;
}

interface LeftProps {}

@observer
export class Left extends Component<LeftProps> {
  @observable
  private visible = false;

  render() {
    return (
      <Wrapper>
        <ComposeWrapper>
          <Button
            type="primary"
            icon="plus"
            size="large"
            ghost={true}
            onClick={this.toggleCompose}
          >
            写邮件
          </Button>
        </ComposeWrapper>
        <Tabs>{this.renderTabs()}</Tabs>
        <Contact />
        <Compose visible={this.visible} onClose={this.toggleCompose} />
      </Wrapper>
    );
  }

  private renderTabs(): ReactNode {
    return TAB_ITEMS.map((item, index) => (
      <TabItem
        key={index}
        icon={item.icon}
        text={item.text}
        active={index === 0}
      />
    ));
  }

  @action
  toggleCompose = (): void => {
    this.visible = !this.visible;
  };
}

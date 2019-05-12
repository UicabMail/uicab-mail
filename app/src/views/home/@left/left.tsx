import React, { Component, ReactNode } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { TabItem } from "./@tab-item";
import { Button } from "antd";
import { Contact } from "./@contact";
import { Compose } from "./@compose";
import { observable, action } from "mobx";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

const Wrapper = styled.div`
  width: 280px;
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
    icon: "icon-work",
    text: "工作邮件",
    path: "work"
  },
  {
    icon: "icon-inbox",
    text: "收件箱",
    path: "inbox"
  },
  {
    icon: "icon-favorite",
    text: "已加星标",
    path: "star"
  },
  {
    icon: "icon-send",
    text: "已发邮件",
    path: "sent"
  },
  {
    icon: "icon-draft",
    text: "草稿",
    path: "draft"
  }
];

interface ItemData {
  icon: string;
  text: string;
  path: string;
}

interface LeftProps extends RouteComponentProps {}

@observer
export class _Left extends Component<LeftProps> {
  @observable
  private visible = false;

  @observable
  private active: number | undefined;

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

  componentDidMount(): void {
    this.updateActive();
  }

  componentDidUpdate(): void {
    this.updateActive();
  }

  private renderTabs(): ReactNode {
    return TAB_ITEMS.map(({ path, icon, text }, index) => (
      <Link to={path} key={index}>
        <TabItem icon={icon} text={text} active={index === this.active} />
      </Link>
    ));
  }

  @action
  private updateActive(): void {
    let {
      history: {
        location: { pathname }
      }
    } = this.props;

    this.active = TAB_ITEMS.findIndex(item => pathname.includes(item.path));
  }

  @action
  toggleCompose = (): void => {
    this.visible = !this.visible;
  };
}

export const Left = withRouter(_Left);

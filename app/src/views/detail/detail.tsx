import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Mail } from "../../models/mail";
import { Card, Icon, Skeleton, Avatar } from "antd";
import { Meta } from "antd/lib/list/Item";
import { observable, runInAction } from "mobx";
import { IconFont as _IconFont } from "../../components";

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 12px;

  > * {
    width: 100%;
  }
`;

const IconFont = styled(_IconFont)``;

const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;

  ${IconFont} {
    margin-right: 1em;
  }
`;

const Content = styled.div`
  min-height: 340px;
  padding: 24px;
`;

interface DetailProps {
  mail: Mail;
}

@observer
export class Detail extends Component<DetailProps> {
  @observable
  private loading = true;

  componentDidMount(): void {
    runInAction(() => {
      this.loading = false;
    });
  }

  render() {
    return (
      <Wrapper>
        <Card
          actions={[
            <ActionWrapper>
              <IconFont type="icon-reply" onClick={this.onReplyClick} />
              回复
            </ActionWrapper>,
            <ActionWrapper>
              <IconFont type="icon-forward" onClick={this.onForwardClick} />
              转发
            </ActionWrapper>,
            <Icon type="ellipsis" />
          ]}
        >
          <Skeleton loading={this.loading} avatar active>
            <Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title="一份邮件"
              description="00点49分"
            />
          </Skeleton>
          <Content>
            本周五，特朗普在推特上表示，美国财政部原本宣布在现有对朝制裁的基础上“追加大规模制裁”，而他下令撤销了这一新制裁。
            然而周五美国财政部没有宣布新的对朝制裁，只是在周四公布了对两家中国公司的制裁。因此外界一时以为特朗普叫停了对中国公司的惩罚。
            周四，美国财政部宣布，对两家他们认为帮助朝鲜躲避制裁的中国航运公司施加制裁，这是河内峰会后美国首次出台涉朝制裁。
          </Content>
        </Card>
      </Wrapper>
    );
  }

  private onReplyClick = (): void => {};

  private onForwardClick = (): void => {};
}

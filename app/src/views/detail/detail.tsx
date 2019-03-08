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
          <Content>asd</Content>
        </Card>
      </Wrapper>
    );
  }

  private onReplyClick = (): void => {};

  private onForwardClick = (): void => {};
}

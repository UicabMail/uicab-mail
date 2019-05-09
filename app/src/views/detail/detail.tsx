import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import { Mail } from "../../models/mail";
import { Card, Icon, Skeleton, Avatar } from "antd";
import { Meta } from "antd/lib/list/Item";
import { observable, runInAction, computed } from "mobx";
import { IconFont as _IconFont } from "../../components";
import { ServicesProps } from "../../service-entrances";
import "braft-editor/dist/output.css";

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

interface DetailProps extends ServicesProps {}

@inject("mailService")
@observer
export class Detail extends Component<DetailProps> {
  private mailService = this.props.mailService!;

  @computed
  private get mail(): Mail | undefined {
    return this.mailService.detail;
  }

  @observable
  private loading = true;

  componentDidMount(): void {
    runInAction(() => {
      this.loading = false;
    });
  }

  render() {
    let mail = this.mail;

    if (!mail) {
      return "请选择邮件";
    }

    let { subject, content, time, contentType } = mail;

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
              avatar={<Avatar src={"from"} />}
              title={subject}
              description={time}
            />
          </Skeleton>

          {contentType.startsWith("text/plain") ? (
            <Content>{content}</Content>
          ) : (
            <Content
              className="braft-output-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </Card>
      </Wrapper>
    );
  }

  private onReplyClick = (): void => {};

  private onForwardClick = (): void => {};
}

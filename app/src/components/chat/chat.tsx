import React, { Component, ReactNode, KeyboardEvent, createRef } from "react";
import styled from "styled-components";
import { User, Message } from "../../models";
import { Modal, Input } from "antd";
import { computed, observable, action, runInAction } from "mobx";
import { Item } from "./@item";
import { ServicesProps } from "../../service-entrances";
import { inject, observer } from "mobx-react";

import scrollIntoView from "scroll-into-view-if-needed";

const { TextArea } = Input;

const Wrapper = styled.div``;

const Content = styled.div`
  min-height: 300px;
  max-height: 480px;
  overflow: auto;
`;

export interface ChatProps extends ServicesProps {
  visible: boolean;
  user: User;
  onClose: () => void;
}

@inject("userService", "messageService")
@observer
export class Chat extends Component<ChatProps> {
  @observable
  private userSession: string | undefined;

  @observable
  private messages: Message[] = [];

  private contentRef = createRef<HTMLDivElement>();

  private userService = this.props.userService!;

  private messageService = this.props.messageService!;

  private get content(): HTMLElement {
    return this.contentRef.current!;
  }

  @computed
  private get online(): boolean {
    return !!this.userSession;
  }

  @computed
  private get footerRendering(): ReactNode {
    let online = this.online;

    return (
      <TextArea
        disabled={!online}
        placeholder={
          online ? "请输入消息（回车键发送）" : "用户当前离线，无法聊天"
        }
        rows={4}
        onPressEnter={this.onPressEnter}
      />
    );
  }

  render() {
    let {
      visible,
      user: { username },
      onClose
    } = this.props;

    let online = this.online;

    return (
      <Wrapper>
        <Modal
          title={`${username} (${online ? "在线" : "离线"})`}
          visible={visible}
          footer={this.footerRendering}
          mask={false}
          width="70%"
          bodyStyle={{ padding: 0 }}
          onCancel={onClose}
        >
          <Content ref={this.contentRef}>
            {this.messages.map((message, index) => (
              <Item name={username} message={message} key={index} />
            ))}
          </Content>
        </Modal>
      </Wrapper>
    );
  }

  componentDidMount(): void {
    this.userService.on("CHECK_ONLINE", this.onCheckOnline);
    this.messageService.on("MESSAGING", this.onMessaging);
    this.checkOnline();
    this.onMessaging();
  }

  componentWillUnmount(): void {
    this.userService.off("CHECK_ONLINE", this.onCheckOnline);
    this.messageService.on("MESSAGING", this.onMessaging);
  }

  private onMessaging = (): void => {
    let {
      user: { id }
    } = this.props;

    setTimeout(() => {
      runInAction(() => {
        this.messages = this.messageService.getChatMessage(id);
      });

      let contentElement = this.content;
      if (contentElement && contentElement.lastElementChild) {
        scrollIntoView(contentElement.lastElementChild, {
          block: "end"
        });
      }
    });
  };

  @action
  private onPressEnter = ({
    currentTarget
  }: KeyboardEvent<HTMLTextAreaElement>): void => {
    let { user } = this.props;
    let userSession = this.userSession;

    if (!userSession) {
      return;
    }

    let content = currentTarget.value;
    let id = user.id;

    this.messageService.sendMessage(user, userSession, content);
    this.messages.push({ user: id, current: true, content });

    setTimeout(() => {
      currentTarget.value = "";

      scrollIntoView(this.content.lastElementChild!, {
        block: "end"
      });
    });
  };

  @action
  private onCheckOnline = (
    online: boolean,
    session?: string | undefined
  ): void => {
    this.userSession = online ? session : undefined;
  };

  private checkOnline(): void {
    let { user } = this.props;
    this.userService.checkOnline(user.id);
  }
}

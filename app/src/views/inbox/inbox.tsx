import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import { MailList } from "../../components/mail-list";
import { ServicesProps } from "../../service-entrances";
import { Mail } from "../../models";
import { observable, action } from "mobx";

const Wrapper = styled.div`
  height: 100%;
`;

interface InboxProps extends ServicesProps {}

@inject("mailService")
@observer
export class Inbox extends Component<InboxProps> {
  private mailService = this.props.mailService!;

  @observable
  private mails: Mail[] = [];

  render() {
    return (
      <Wrapper>
        <MailList mails={this.mails} />
      </Wrapper>
    );
  }

  componentDidMount(): void {
    this.mailService.receive("INBOX", 1);
    this.mailService.on("RECEIVED", this.onReceiveMails);
  }

  @action
  private onReceiveMails = (mails: Mail[]): void => {
    this.mails = mails;
  };
}

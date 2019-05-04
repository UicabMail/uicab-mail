import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import { MailList } from "../../components/mail-list";
import { ServicesProps } from "../../service-entrances";

const Wrapper = styled.div`
  height: 100%;
`;

interface InboxProps extends ServicesProps {}

@inject("mailService")
@observer
export class Inbox extends Component<InboxProps> {
  private mailService = this.props.mailService!;

  render() {
    return (
      <Wrapper>
        <MailList mails={[]} />
      </Wrapper>
    );
  }

  componentDidMount(): void {
    this.mailService.receive("all");
  }
}

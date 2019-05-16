import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import { MailList } from "../../components/mail-list";
import { ServicesProps } from "../../service-entrances";
import { Mail } from "../../models";
import { computed } from "mobx";

const Wrapper = styled.div`
  height: 100%;
`;

interface WorkProps extends ServicesProps {}

@inject("mailService")
@observer
export class Work extends Component<WorkProps> {
  private mailService = this.props.mailService!;

  @computed
  private get mails(): Mail[] {
    return this.mailService!.work;
  }

  render() {
    return (
      <Wrapper>
        <MailList mails={this.mails} />
      </Wrapper>
    );
  }

  componentDidMount(): void {}
}

import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import { MailList } from "../../components/mail-list";
import { ServicesProps } from "../../service-entrances";
import { Mail } from "../../models";
import { observable, runInAction } from "mobx";

const Wrapper = styled.div`
  height: 100%;
`;

interface WorkProps extends ServicesProps {}

@inject("mailService")
@observer
export class Work extends Component<WorkProps> {
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
    runInAction(() => {
      this.mails = this.mailService.work;
    });
  }
}

import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import { MailList } from "../../components/mail-list";
import { ServicesProps } from "../../service-entrances";
import { Mail } from "../../models";
import { observable, runInAction } from "mobx";
import { RouteComponentProps } from "react-router-dom";

const Wrapper = styled.div`
  height: 100%;
`;

interface SearchProps extends ServicesProps, RouteComponentProps {}

@inject("mailService")
@observer
export class Search extends Component<SearchProps> {
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
    this.getSearch();
  }

  componentDidUpdate(): void {
    this.getSearch();
  }

  private getSearch(): void {
    runInAction(() => {
      if (this.mails.length === this.mailService.search.length) {
        return;
      }

      this.mails = this.mailService.search;
    });
  }
}

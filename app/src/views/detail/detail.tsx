import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { MailList } from "../../components/mail-list";

const Wrapper = styled.div`
  height: 100%;
`;

interface DetailProps {}

@observer
export class Detail extends Component<DetailProps> {
  render() {
    return (
      <Wrapper>
        <MailList mails={[]} />
      </Wrapper>
    );
  }
}

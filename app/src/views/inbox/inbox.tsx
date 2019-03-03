import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { MailList } from "../../components/mail-list";

const Wrapper = styled.div`
  height: 100%;
`;

interface InboxProps {}

@observer
export class Inbox extends Component<InboxProps> {
  render() {
    return (
      <Wrapper>
        <MailList mails={[]} />
      </Wrapper>
    );
  }
}

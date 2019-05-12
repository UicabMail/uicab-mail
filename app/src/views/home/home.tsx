import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Header } from "./@header";
import { Left } from "./@left";
import { Route } from "react-router";
import { Inbox } from "../inbox";
import { Detail } from "../detail";
import { WrapperProfile } from "../profile";
import { Edit } from "../edit";
import { Sent } from "../sent";
import { Work } from "../work";
import { Draft } from "../draft";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-size: cover;
  background-position: center;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow: hidden;
`;

interface HomeProps {}

@observer
export class Home extends Component<HomeProps> {
  render() {
    return (
      <Wrapper>
        <Header />
        <ContentWrapper>
          <Left />
          <Content>
            <Route path="/inbox" component={Inbox} />
            <Route path="/work" component={Work} />
            <Route path="/sent" component={Sent} />
            <Route path="/draft" component={Draft} />
            <Route path="/detail" component={Detail} />
            <Route path="/profile" component={WrapperProfile} />
            <Route path="/edit" component={Edit} />
          </Content>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Header } from "./@header";
import { Left } from "./@left";

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
  background-color: #fff;
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
          <Content />
        </ContentWrapper>
      </Wrapper>
    );
  }
}

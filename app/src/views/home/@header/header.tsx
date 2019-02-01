import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Icon as _Icon } from "antd";
import { SearchBlock } from "./@search-block";
import { Logo } from "./@logo";
import { Menu } from "./@menu";

const Wrapper = styled.div`
  height: 64px;
  display: flex;
  box-shadow: inset 0 -1px 0 rgba(100, 121, 143, 0.122);
`;

const SearchWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

interface HeaderProps {}

@observer
export class Header extends Component<HeaderProps> {
  render() {
    return (
      <Wrapper>
        <Logo />
        <SearchWrapper>
          <SearchBlock />
        </SearchWrapper>
        <Menu />
      </Wrapper>
    );
  }
}

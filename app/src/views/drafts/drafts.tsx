import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";

const Wrapper = styled.div``;

interface DraftsProps {}

@observer
export class Drafts extends Component<DraftsProps> {
  render() {
    return <Wrapper>草稿箱</Wrapper>;
  }
}

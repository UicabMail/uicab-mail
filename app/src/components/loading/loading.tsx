import React, { Component } from "react";
import styled from "styled-components";
import { Progress } from "antd";

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 25%;
  font-size: 1.8em;
  z-index: 10000;
`;

export interface LoadingProps {
  percent: number;
}

export class Loading extends Component<LoadingProps> {
  render() {
    let { percent } = this.props;

    return (
      <Wrapper>
        身份验证中...
        <Progress percent={percent} />
      </Wrapper>
    );
  }
}

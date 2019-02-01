import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Avatar } from "antd";

const Wrapper = styled.div`
  width: 256px;
  display: flex;
  align-items: center;
`;

const LogoIcon = styled.div`
  margin-left: 24px;
`;

const LogoText = styled.div`
  font-size: 22px;
  color: #333;
  padding: 0 8px;
`;

interface LogoProps {}

@observer
export class Logo extends Component<LogoProps> {
  render() {
    return (
      <Wrapper>
        <LogoIcon>
          <Avatar
            style={{ backgroundColor: "rgb(24,144,255)" }}
            shape="square"
            size={42}
          >
            U
          </Avatar>
        </LogoIcon>
        <LogoText>Uicab</LogoText>
      </Wrapper>
    );
  }
}

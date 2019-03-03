import { Form as _Form, Input, Checkbox, Button } from "antd";
import { observer, inject } from "mobx-react";
import React, { Component, ChangeEvent } from "react";
import styled from "styled-components";

import login from "../../assets/login.jpg";
import { ServicesProps } from "../../service-entrances";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${login});
`;

const Header = styled.div`
  height: 58px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
`;

const Logo = styled.div`
  font-size: 20px;
`;

const LoginWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const MenuItem = styled.span`
  padding: 0 8px;
  &:hover {
    cursor: pointer;
  }
`;

const Menu = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 8px 16px;
  color: #fff;

  ${MenuItem} + ${MenuItem} {
    border-left: 1px solid #fff;
  }
`;

const FormWrapper = styled.div`
  position: absolute;
  width: 340px;
  top: 50%;
  right: 12%;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.1);
  transform: translateY(-50%);
  z-index: 1;
`;

const Title = styled.h3`
  padding-top: 30px;
  text-align: center;
`;

const Form = styled(_Form)`
  margin: 40px 20px;
`;

const ForgetButton = styled.a`
  float: right;
`;

const Item = styled(_Form.Item)`
  button {
    width: 100%;
    margin-top: 20px;
  }
`;

const Footer = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface LoginProps extends ServicesProps {}

@inject("userService")
@observer
export class Login extends Component<LoginProps> {
  private username = "";

  private password = "";

  private remember = true;

  render() {
    return (
      <Wrapper>
        <Content>
          <Header>
            <Logo>Uicab</Logo>
          </Header>
          <LoginWrapper>
            <FormWrapper>
              <Title>账号密码登录</Title>
              <Form>
                <Item>
                  <Input
                    size="large"
                    placeholder="邮箱账号 / 管理员账号"
                    onChange={this.onUsernameChange}
                  />
                </Item>
                <Item>
                  <Input
                    size="large"
                    type="password"
                    placeholder="请输入邮箱密码"
                    onChange={this.onPasswordChange}
                  />
                </Item>
                <Item>
                  <Checkbox
                    defaultChecked={this.remember}
                    onChange={this.onCheckboxChange}
                  >
                    一周内自动登录
                  </Checkbox>
                  <ForgetButton>忘记密码</ForgetButton>
                  <Button
                    size="large"
                    type="primary"
                    onClick={this.onLoginButtonClick}
                  >
                    登录
                  </Button>
                </Item>
              </Form>
            </FormWrapper>
            <Menu>
              <MenuItem>新用户注册</MenuItem>
              <MenuItem>关于我们</MenuItem>
              <MenuItem>English</MenuItem>
            </Menu>
          </LoginWrapper>
        </Content>
        <Footer>©2018 - 2019 Boen. All Rights Reserved</Footer>
      </Wrapper>
    );
  }

  private onUsernameChange = ({
    target
  }: ChangeEvent<HTMLInputElement>): void => {
    this.username = target.value.trim() || "";
  };

  private onPasswordChange = ({
    target
  }: ChangeEvent<HTMLInputElement>): void => {
    this.password = target.value.trim() || "";
  };

  private onCheckboxChange = (): void => {
    this.remember = !this.remember;
  };

  private onLoginButtonClick = (): void => {
    let { userService } = this.props;
    let username = this.username;
    let password = this.password;
    let remember = this.remember;

    userService!.login({ username, password }, remember);
  };
}

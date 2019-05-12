import React, { Component, MouseEvent } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import { Checkbox, Icon as _Icon, List } from "antd";
import { Mail } from "../../../models";
import { ServicesProps } from "../../../service-entrances";
import { RouteComponentProps, withRouter } from "react-router";

const Icon = styled(_Icon)`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-left: 1em;
  color: #202124;
  opacity: 0.16;
  cursor: pointer;

  &:hover&:hover {
    opacity: 1;
  }
`;

const Title = styled.div`
  width: 25%;
  padding-left: 1em;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
`;

const Text = styled.div`
  flex: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Menu = styled.div`
  display: none;
  min-width: 20%;
`;

const Date = styled.div`
  min-width: 12%;
`;

const Wrapper = styled(List.Item)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;

  &.unread {
    font-weight: 900;
  }

  & > :first-child {
    margin-left: 2%;
  }

  & > :last-child {
    margin-right: 2%;
  }

  &:hover {
    box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0,
      0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);

    ${Menu} {
      display: flex;
    }

    ${Date} {
      display: none;
    }

    ${Icon} {
      opacity: 0.4;
    }
  }
`;

interface MailItemProps extends ServicesProps, RouteComponentProps {
  mail: Mail;
}

@inject("mailService")
@observer
export class _MailItem extends Component<MailItemProps> {
  private mailService = this.props.mailService!;

  render() {
    let {
      mail: { subject, time, seen, from, fromName }
    } = this.props;

    // content = contentType.startsWith("text") ? content : "点击查看邮件详情...";

    return (
      <Wrapper onClick={this.onItemClick} className={seen ? "" : "unread"}>
        <Checkbox />
        <Icon type="star" title="星标" onClick={this.onStarClick} />
        {/* <Icon type="tag" title="标记" /> */}
        <Title>{fromName || from}</Title>
        <Content>
          <Text>{subject}</Text>
          <Menu>
            <Icon type="delete" />
          </Menu>
          <Date>{time}</Date>
        </Content>
      </Wrapper>
    );
  }

  private onStarClick = (event: MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
  };

  private onItemClick = (): void => {
    let { mail, history } = this.props;

    this.mailService.setDetail(mail);

    history.push("detail");
  };
}

export const MailItem = withRouter(_MailItem);

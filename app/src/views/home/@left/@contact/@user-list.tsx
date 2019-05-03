import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { List, Avatar } from "antd";
import { User } from "../../../../models";

const Wrapper = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const WriteMail = styled.div`
  cursor: pointer;
`;

interface UserListProps {
  users: User[];
  onUserClick(user: User): void;
}

@observer
export class UserList extends Component<UserListProps> {
  render() {
    let { users } = this.props;

    return (
      <Wrapper>
        <List
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(user: User) => (
            <List.Item
              onClick={() => {
                this.onClick(user);
              }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src="https://avatars0.githubusercontent.com/u/33797740?s=460&v=4" />
                }
                title={user.username}
                description={user.mail}
              />
              <WriteMail
                onClick={() => {
                  this.onClick(user);
                }}
              >
                写信
              </WriteMail>
            </List.Item>
          )}
        />
      </Wrapper>
    );
  }

  private onClick(user: User): void {
    let { onUserClick } = this.props;
    onUserClick(user);
  }
}

import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import { List, Avatar } from "antd";
import { User } from "../../../../models";
import { ServicesProps } from "../../../../service-entrances";

const data = [
  {
    title: "联系人 1"
  },
  {
    title: "联系人 2"
  },
  {
    title: "联系人 3"
  },
  {
    title: "联系人 4"
  }
];

const Wrapper = styled.div`
  flex: 1;
`;

interface UserListProps extends ServicesProps {
  onUserClick(user: User): void;
}

@inject("userService")
@observer
export class UserList extends Component<UserListProps> {
  render() {
    return (
      <Wrapper>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item: any) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://avatars0.githubusercontent.com/u/33797740?s=460&v=4" />
                }
                title={item.title}
              />
              <div
                onClick={() => {
                  this.onClick();
                }}
              >
                写信
              </div>
            </List.Item>
          )}
        />
      </Wrapper>
    );
  }

  private onClick(): void {
    let { onUserClick, userService } = this.props;
    onUserClick(userService!.user!);
  }
}
